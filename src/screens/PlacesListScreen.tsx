import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IRooReduxState } from '../store/types';
import PlaceItem from '../components/PlaceItem';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = props => {
  const places = useSelector((state: IRooReduxState) => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={''}
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

const styles = StyleSheet.create({});

export default PlacesListScreen;
