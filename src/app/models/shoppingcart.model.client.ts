import {Cake} from "./cake.model.client";

export class ShoppingCart {
  _id: String;
  uid: String;
  cakeId: String;
  cakes : Cake[];

  constructor(_id, uid, cakeId) {
    this._id = _id;
    this.uid = uid;
    this.cakeId = cakeId;
  }
}
