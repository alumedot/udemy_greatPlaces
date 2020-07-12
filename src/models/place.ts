class Place {
  private id: string;
  private title: string;
  private imageUri: string;

  constructor(id: string, title: string, imageUri: string) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
  }

}

export default Place;
