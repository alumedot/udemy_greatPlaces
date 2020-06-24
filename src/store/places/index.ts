import * as T from './types';
import Place from '../../models/place';

export enum ActionTypesPlaces {
  AddPlace = 'ADD_PLACE',
}

//   - - - reducer - - -   //

export type TPlacesState = {
  places: Array<{ id: string, title: string}>;
};

const initialState: TPlacesState = {
  places: [],
}

export default (state: TPlacesState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypesPlaces.AddPlace:
      const newPlace = new Place(new Date().toString(), action.title);
      return {
        places: [...state.places, newPlace],
      };
    default: return state
  }
};

//   - - -  - -  - - -   //

//   - - - action creators - - -   //

export const addPlace = (title: string) => {
  return {
    type: ActionTypesPlaces.AddPlace,
    title,
  }
}

//   - - -  - -  - - -   //

export type Actions = T.TAddPlace;
