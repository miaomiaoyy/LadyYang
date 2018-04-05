import {User} from '../model/user.model.client';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response, RequestOptions} from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  // users: User[] = [
  //   {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
  //   {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
  //   {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia'},
  //   {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi'}
  // ];

  // createUser(user: User) {
  //   this.users.push(new User(user._id, user.username, user.password, user.firstName, user.lastName));
  // }

  // createUser(user: any) {
  //   user._id = Math.random().toString();
  //   this.users.push(user);
  //   console.log(this.users);
  // }
  createUser(user: User) {
    console.log('client side user create');
    const url = this.baseUrl + '/api/user';
    console.log('url= ' + url);
    return this.http.post(url, user).map(
      (res: Response) => {
        return res.json();
      }
    );
  }


  //  findUserByCredential(username: String, password: String) {
  //   return this.users.find( function (user) {
  //     return user.username === username && user.password === password;
  //   });
  // }

  // findUserByCredentials(username: String, password: String) {
  //   for (let x = 0; x < this.users.length; x++) {
  //     if (this.users[x].username === username
  //       && this.users[x].password === password) {
  //       return this.users[x];
  //     }
  //   }
  // }

  findUserByCredentials(username: String, password: String) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    console.log('url= ' + url);
    return this.http.get(url).map(
      (response: Response) => {
        // console.log(response.json());
        return response.json();
      }
    );
  }

  // findUserById(userId: String) {
  //   return this.users.find(function (user) {
  //     return user._id === userId;
  //   });
  // }

  findUserById(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    // console.log(this.http.get(url).map);
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // findUserByUsername(username) {
  //   return this.users.find(function (user) {
  //     return user.username === username;
  //   });
  // }

  // findUserByUsername(username: String) {
  //   for (let x = 0; x < this.users.length; x++) {
  //     if (this.users[x].username === username) {
  //       return this.users[x];
  //     }
  //   }
  // }

  // updateUser(user: User) {
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (this.users[i]._id === user._id) {
  //       this.users[i].firstName = user.firstName;
  //       this.users[i].lastName = user.lastName;
  //       return this.users[i];
  //     }
  //   }
  // }

  // updateUser(userId: String, user: any) {
  //   for (let x = 0; x < this.users.length; x++) {
  //     if (this.users[x]._id === userId) {
  //       this.users[x].firstName = user.firstName;
  //       this.users[x].lastName = user.lastName;
  //     }
  //   }
  // }

  updateUser(userId: String, user: User) {
    console.log('client side update user');
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.put(url, user).map((response: Response) => {
      // console.log('response= ' + response.json());
      return response.json();
    });
  }

  deleteUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }
}
