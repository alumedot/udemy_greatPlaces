import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import Place from '../../models/place';
import * as T from './types';

export enum ActionTypesPlaces {
  AddPlace = 'ADD_PLACE',
  SetPlaces = 'SET_PLACES',
}

//   - - - reducer - - -   //

export type TPlacesState = {
  places: Array<{
    id: string,
    title: string,
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
      const newPlace = new Place(String(action.insertId), action.title, action.image);
      return {
        places: [...state.places, newPlace],
      };
    case ActionTypesPlaces.SetPlaces:
      return {
        places: action.places.map(place => new Place(String(place.id), place.title, place.imageUri)),
      };
    default: return state
  }
};

//   - - -  - -  - - -   //

//   - - - action creators - - -   //

export const addPlace = (title: string, selectedImage: string) => {
  return async dispatch => {
    const fileName = selectedImage.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName!;

    try {
      await FileSystem.moveAsync({
        from: selectedImage,
        to: newPath,
      });
      const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3);

      dispatch({
        type: ActionTypesPlaces.AddPlace,
        id: dbResult.insertId,
        title,
        image: newPath,
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
