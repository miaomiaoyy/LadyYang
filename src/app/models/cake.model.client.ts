export class Cake {
  _id: String;
  userId: String;
  name: String;
  color: String;
  description: String;
  url: String;

  constructor(_id, userId, name, description, url) {
    this._id = _id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.url = url;
  }

}
