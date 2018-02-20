export class User {
  uid: String;
  username: String;
  password: String;
  email: String;
  firstName: String;
  lastName: String;

  constructor(uid, username, password, firstName, lastName) {
    this.uid = uid;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}
