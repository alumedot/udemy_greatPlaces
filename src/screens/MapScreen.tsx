import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import { Colors } from '../constants';

const MapScreen = (props) => {
  const [ selectedLocation, setSelectedLocation ] = useState<{ lat: number, lng: number } | null>(null);
  const mapRegion = {
    latitude: 44.68395800531082,
    longitude: 37.78696593213832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onSelectLocation = (e: MapEvent) => {
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    })
  };

  const onSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'Choose a location',
        'You need to choose some location first',
        [{ text: 'Okay' }],
      );
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: onSavePickedLocation });
  }, [onSavePickedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={onSelectLocation}
    >
      {
        markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates} />
      }
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation');
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.Primary,
  }
});

export default MapScreen;
