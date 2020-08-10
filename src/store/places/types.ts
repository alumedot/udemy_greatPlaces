import { ActionTypesPlaces } from '.';

export type TPlace = {
  id: string,
  title: string,
  imageUri: string,
  lat: number,
  lng: number,
};

export type TAddPlace = {
  type: ActionTypesPlaces.AddPlace;
  insertId: number;
  title: string;
  image: string;
}

export type TSetPlaces = {
  type: ActionTypesPlaces.SetPlaces;
  places: TPlace[];
}

export type Actions =
  | TAddPlace
  | TSetPlaces;
