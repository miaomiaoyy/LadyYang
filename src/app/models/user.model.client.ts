export class User {
  _id: String;
  username: String;
  password: String;

  firstName: String;
  lastName: String;

  constructor(_id, username, password, firstName, lastName) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}
