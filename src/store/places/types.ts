import { ActionTypesPlaces } from '.';

export type TPlace = {
  id: string,
  title: string,
  imageUri: string,
  address: string;
  lat: number,
  lng: number,
};

export type TAddPlace = {
  type: ActionTypesPlaces.AddPlace;
  insertId: number;
  title: string;
  image: string;
  address: string;
  coords: {
    lat: number,
    lng: number,
  };
}

export type TSetPlaces = {
  type: ActionTypesPlaces.SetPlaces;
  places: TPlace[];
}

export type Actions =
  | TAddPlace
  | TSetPlaces;
