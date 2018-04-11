import { User } from '../models/user.model.client';
import {Cake} from '../models/cake.model.client';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class UserService {
  constructor(private http: Http, private sharedService: SharedService, private router: Router, private cookieService: CookieService ) {}

  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  addToShoppingCart(user: User, cake: Cake) {
    if(!user) {
      let shoppingCart = JSON.parse(this.cookieService.get('shoppingCart'));

      shoppingCart = shoppingCart && shoppingCart.length > 0 ? [...shoppingCart, cake] : [cake];
      this.cookieService.set('shoppingCart', JSON.stringify(shoppingCart));
    } else {
      //save to server
      return this.http.post(this.baseUrl + '/api/shoppingCart' , {
        user: User,
        cake: Cake
      });
    }
  }
}
