export class ShoppingCart {
  _id: String;
  uid: String;
  cakeId: String;

  constructor(_id, uid, cakeId) {
    this._id = _id;
    this.uid = uid;
    this.cakeId = cakeId;
  }
}
