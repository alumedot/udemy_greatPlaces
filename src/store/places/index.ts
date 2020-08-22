import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import Place from '../../models/place';
import * as T from './types';
import ENV from '../../../env';

export enum ActionTypesPlaces {
  AddPlace = 'ADD_PLACE',
  SetPlaces = 'SET_PLACES',
}

//   - - - reducer - - -   //

export type TPlacesState = {
  places: Array<{
    id: string,
    title: string,
    address: string,
    imageUri: string,
    lat: number,
    lng: number,
  }>;
};

const initialState: TPlacesState = {
  places: [],
}

export default (state: TPlacesState = initialState, action: T.Actions) => {
  switch (action.type) {
    case ActionTypesPlaces.AddPlace:
      const newPlace = new Place(
        String(action.insertId),
        action.title,
        action.image,
        action.address,
        action.coords.lat,
        action.coords.lng,
      );
      return {
        places: [...state.places, newPlace],
      };
    case ActionTypesPlaces.SetPlaces:
      return {
        places: action.places.map(place => new Place(
          String(place.id),
          place.title,
          place.imageUri,
          place.address,
          place.lat,
          place.lng,
        )),
      };
    default: return state
  }
};

//   - - -  - -  - - -   //

//   - - - action creators - - -   //

export const addPlace = (title: string, selectedImage: string, selectedLocation: { lat: number, lng: number }) => {
  return async dispatch => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
      selectedLocation.lat
    },${selectedLocation.lng}&key=${ENV.googleApiKey}`);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error('Something went wrong!');
    }

    const address = resData.results[0].formatted_address;

    const fileName = selectedImage.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName!;

    try {
      await FileSystem.moveAsync({
        from: selectedImage,
        to: newPath,
      });
      const dbResult = await insertPlace(title, newPath, address, selectedLocation.lat, selectedLocation.lng);

      dispatch({
        type: ActionTypesPlaces.AddPlace,
        id: dbResult.insertId,
        title,
        image: newPath,
        address,
        coords: {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: ActionTypesPlaces.SetPlaces, places: dbResult.rows._array });
    } catch (e) {
      throw e;
    }
  }
};

//   - - -  - -  - - -   //
