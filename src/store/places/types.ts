import { ActionTypesPlaces } from '.';

export type TAddPlace = {
  type: ActionTypesPlaces.AddPlace;
  title: string;
  image: string;
}
