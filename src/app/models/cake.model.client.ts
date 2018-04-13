export class Cake {
  _id: String;
  name: String;
  color: String;
  layer: Number;
  description: String;
  url: String;

  constructor(_id, name, description, url) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.url = url;
  }

}
