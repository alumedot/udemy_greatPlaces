import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as placesActions from '../store/places';
import { IRooReduxState } from '../store/types';
import PlaceItem from '../components/PlaceItem';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = props => {
  const places = useSelector((state: IRooReduxState) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => props.navigation.navigate(
            'PlaceDetail',
            {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            },
          )}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Places',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add' }
            onPress={() => navData.navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      ),
    };
};

export default PlacesListScreen;
