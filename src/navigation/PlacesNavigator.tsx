import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import { Colors } from '../constants';

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.Primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.Primary
    }
  }
);

export default createAppContainer(PlacesNavigator);
