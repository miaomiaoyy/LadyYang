import { User } from '../models/user.model.client';
import {Cake} from '../models/cake.model.client';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ShoppingCart} from '../models/shoppingcart.model.client';
import {Observable} from 'rxjs/Observable';
import {Widget} from "../models/widget.model.client";



@Injectable()
export class ShoppingCartService {
  constructor(private http: Http, private sharedService: SharedService, private router: Router, private cookieService: CookieService) {
  }

  baseUrl = environment.baseUrl;

  addToShoppingCart(userId, cakeId) {
    console.log('userid inside shoppinfcard service client' + userId);
    if (userId != null) {
      // let shoppingCart = JSON.parse(this.cookieService.get('shoppingcart'));
      //
      // shoppingCart = shoppingCart && shoppingCart.length > 0 ? [...shoppingCart, cake] : [cake];
      // this.cookieService.set('shoppingCart', JSON.stringify(shoppingCart));
      return this.http.post(this.baseUrl + '/api/' + userId + '/shoppingcart' + '/add', {
        cakeId
      }).map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
    } else {

      userId = Math.random().toString(36).substr(2, 9);
      return this.http.post(this.baseUrl + '/api/' + userId + '/shoppingcart', {
        user: User,
        cake: Cake
      }).map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
    }
  }

  // directly pass a new cart????

  changeQuantity(cakeId, cart) {
    const url = this.baseUrl + '/api/page/' + cakeId;
    return this.http.put(url, cart).map((response: Response) => {
      return response.json();
    });
  }

  empty(cart: ShoppingCart) {
    return new ShoppingCart(cart._id, undefined, undefined);
  }


  removeFromCart(cakeId) {
    const url = this.baseUrl + '/api/page/' + cakeId;
    return this.http.delete(url);
  }

  // getAllProducts(): Observable <cakes[]> {
  //   return this.http.get(this.baseUrl + '/api/cakes/shoppingcart')
  //     .map((res: Response) => res.json())
  //     .catch((error: any) => Observable.throw('Server error'));
  // }

  findCartForUser(userId:String) {
    const url = this.baseUrl + '/api/shoppingcart/'+ userId;
    console.log(url, 'url');
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }


  findShoppingCartByUserId(userId:String) {
    const url = this.baseUrl + '/api/shoppingcart/'+ userId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }


  addItem(userId, cakeId) {
    const url = this.baseUrl + '/api/' + userId + '/shoppingcart/add';
    return this.http.post(url, cakeId)
      .map((response: Response) => {
        return response.json();
      });
  }

}


  //  emptyCartForUser(userId) {
  //   const newCart = new ShoppingCart(undefined, userId,undefined);
  //   this.save(newCart);
  //   this.dispatch(newCart);
  // }

  // public setDeliveryOption(deliveryOption: DeliveryOption): void {
  //   const cart = this.retrieve();
  //   cart.deliveryOptionId = deliveryOption.id;
  //   this.calculateCart(cart);
  //   this.save(cart);
  //   this.dispatch(cart);
  // }

  // private calculateCart(cart: ShoppingCart): void {
  //   cart.itemsTotal = cart.items
  //     .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
  //     .reduce((previous, current) => previous + current, 0);
  //   cart.deliveryTotal = cart.deliveryOptionId ?
  //     this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
  //     0;
  //   cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  // }
  //
  // private retrieve(): ShoppingCart {
  //   const cart = new ShoppingCart();
  //   const storedCart = this.storage.getItem(CART_KEY);
  //   if (storedCart) {
  //     cart.updateFrom(JSON.parse(storedCart));
  //   }
  //
  //   return cart;
  // }
  //
  // private save(cart: ShoppingCart): void {
  //   this.storage.setItem(CART_KEY, JSON.stringify(cart));
  // }
  //
  // private dispatch(cart: ShoppingCart): void {
  //   this.subscribers
  //     .forEach((sub) => {
  //       try {
  //         sub.next(cart);
  //       } catch (e) {
  //         // we want all subscribers to get the update even if one errors.
  //       }
  //     });
  // }
