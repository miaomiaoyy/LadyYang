export class Page {
  _id: String;
  name: String;
  websiteId: String;
  description: String;

  constructor(_id, name, websiteId, description) {
    this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.description = description;
  }
}
