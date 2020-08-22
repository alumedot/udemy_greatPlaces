class Place {
  private id: string;
  private title: string;
  private imageUri: string;
  private address: string;
  private lat: number;
  private lng: number;

  constructor(id: string, title: string, imageUri: string, address, lat, lng) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }

}

export default Place;
