import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';


@Injectable()
export class UserService {
  constructor(private http: Http, private sharedService: SharedService, private router: Router) {}

  baseUrl = environment.baseUrl;
  options = new RequestOptions();


  createUser(user: User) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user)
      .map((response: Response) => {
        console.log('connected');
        return response.json();
      });
  }


  login(username: String, password: String) {
    this.options.withCredentials = true; // jga
    const body = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
           return res.json();
        }
      );
  }


  logout() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const user = {
      username : username,
      password : password
    };

    return this.http.post(this.baseUrl + '/api/register', user, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }


  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/loggedin', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  findUserByCredential(username: String, password: String) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId: String) {
    return this.http.get(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByUserName(username: String) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(user: User) {
    const url =  this.baseUrl + '/api/user/' + user._id;
    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }


}
