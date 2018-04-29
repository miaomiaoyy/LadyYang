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

export class CakeDesc
{

  // modifications
  public modifications: { [i: string]: CakeModification } = {};

  public setText(text: string)
  {
    this.modifications["text"] = new CakeModification("", text);
  }

  public setColor(color: string)
  {
    this.modifications["color"] = new CakeModification("", color);
  }

}

export class CakeModification {
  constructor(
    public key: string,
    public value: string
  )
  {

  }
}
