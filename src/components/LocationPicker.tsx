import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from '../components/MapPreview';
import { Colors } from '../constants';

const LocationPicker = (props) => {
  const [ pickedLocation, setPickerLocation ] = useState<{ lat: number, lng: number } | null>(null);
  const [ isFetching, setIsFetching ] = useState(false);
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app',
        [{ text: 'Okay' }],
      )
      return false;
    }
    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({ timeout: 5000, });
      setPickerLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (e) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }],
      )
    }
    setIsFetching(false);
  };

  const pickOnMap = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        onPress={pickOnMap}
        styles={styles.mapPreview}
      >
          {
            isFetching ? <ActivityIndicator size="large" color={Colors.Primary} /> : <Text>No location chosen yet!</Text>
          }
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.Primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.Primary}
          onPress={pickOnMap}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationPicker;
