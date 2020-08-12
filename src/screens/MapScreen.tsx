import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';

const MapScreen = () => {
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

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});

export default MapScreen;
