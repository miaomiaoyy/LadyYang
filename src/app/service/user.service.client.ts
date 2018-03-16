

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// injecting Http service into UserService
@Injectable()

export class UserService {

  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserByCredentials(username, password) {
    return this._http.get('http://localhost:3100/api/user?username=' + username + '&password=' + password)
      .map((res: Response) => {
        return res.json();
      });
  }

  updateUser(user) {
    const url =  'http://localhost:3100/api/user/' + user.uid;
    return this._http.put(url, user).map((res: Response) => {
      return res.json();
    });
  }

  createUser(user) {
    const url =  'http://localhost:3100/api/user/' + user.uid;
    return this._http.post(url, user).map((res: Response) => {
      return res.json();
    });
  }

  deleteUser(user) {
    const url =  'http://localhost:3100/api/user/' + user.uid;
    return this._http.delete(url, user).map((res: Response) => {
      return res.json();
    });
  }
}
