import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';


@Injectable()
export class UserService {
  users: User[] = [
    new User('123', 'alice', 'qq', 'Alice', 'Pitt'),
    new User('234', 'bob', 'qq', 'Bob', 'Delon'),
    new User('345', 'charlie', 'qq', 'Charlie', 'Joseph'),
    new User('666', 'yang', '224', 'Yang', 'Yuan')
  ];
  createUser(user: User) {
    this.users.push(new User(user.uid, user.username, user.password, user.firstName, user.lastName));
  }

  findUserByCredential(username: String, password: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username && this.users[i].password === password) {
        return this.users[i];
      }
  }
}

  findUserById(userId: String) {
    return this.users.find(function (user) {
      return user.uid === userId;
    });
  }

  updateUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === user.uid) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
        return this.users[i];
      }
    }
  }

  deleteUser(userId: String) {
    for (const i in this.users) {
      if (this.users[i].uid === userId) {
        const j = +i;
        this.users.splice(j, 1);

      }
    }
  }
}



// import { User } from '../models/user.model.client';
// import {Injectable} from '@angular/core';
// import {Http, Response} from '@angular/http';
// import 'rxjs/Rx';
//
// @Injectable()
// export class UserService {
//
//   constructor(private http: Http) {}
//
//   /*findUserByCredential(username, password){
//     return this.users.find( function (user){
//        return user.username === username && user.password === password;
//     });
//   }
// */
//
//   findUserByCredentials(username, password) {
//     return this.http.get('http://localhost:3100/api/user?username=' + username + '&password=' + password)
//       .map((response: Response) => {
//         return response.json();
//       });
//   }
//
//   findUserById(userId) {
//     return this.http.get('http://localhost:3100/api/user/' + userId)
//       .map((response: Response) => {
//         return response.json();
//       });
//   }
//
//   updateUser(user) {
//     return user;
//   }
// }
