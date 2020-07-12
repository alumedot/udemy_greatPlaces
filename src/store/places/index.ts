import * as FileSystem from 'expo-file-system';
import * as T from './types';
import Place from '../../models/place';

export enum ActionTypesPlaces {
  AddPlace = 'ADD_PLACE',
}

//   - - - reducer - - -   //

export type TPlacesState = {
  places: Array<{
    id: string,
    title: string,
    imageUri: string
  }>;
};

const initialState: TPlacesState = {
  places: [],
}

export default (state: TPlacesState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypesPlaces.AddPlace:
      const newPlace = new Place(new Date().toString(), action.title, action.image);
      return {
        places: [...state.places, newPlace],
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
    } catch (e) {
      console.log(e);
      throw e;
    }

    dispatch({
      type: ActionTypesPlaces.AddPlace,
      title,
      image: newPath,
    });
  };
}

//   - - -  - -  - - -   //

export type Actions = T.TAddPlace;
