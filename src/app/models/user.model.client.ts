import {Cake} from "./cake.model.client";


export class User {
  _id: String;
  username: String;
  password: String;
  firstName: String;
  lastName: String;
  email: String;
  shoppingCart : Array<Cake> = [];

  constructor(_id, username, password, fistName, lastName, email, shoppingCart) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.firstName = fistName;
    this.lastName = lastName;
    this.email = email;
    this.shoppingCart = shoppingCart;
  }

}
