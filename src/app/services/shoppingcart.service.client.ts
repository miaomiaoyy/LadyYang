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



@Injectable()
export class ShoppingCartService {
  constructor(private http: Http, private sharedService: SharedService, private router: Router, private cookieService: CookieService) {
  }

  baseUrl = environment.baseUrl;

  addToShoppingCart(user: User, cake: Cake) {
    if (user != null && user != '' && user != 'undefined') {
      let shoppingCart = JSON.parse(this.cookieService.get('shoppingcart'));

      shoppingCart = shoppingCart && shoppingCart.length > 0 ? [...shoppingCart, cake] : [cake];
      this.cookieService.set('shoppingCart', JSON.stringify(shoppingCart));
    } else {

      user = new User(Math.random().toString(36).substr(2, 9), 'visitor', 'visitor', '', '', '', '');
      return this.http.post(this.baseUrl + '/api/guest/shoppingcart', {
        user: User,
        cake: Cake
      });
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

  findCartForUser(userId) {
    const url = this.baseUrl + '/api/shoppingcart/' + userId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  addItem(cakeId, cake, quantity: number) {
    const url = this.baseUrl + '/api/user/shoppingcart/' + cakeId;
    return this.http.post(url, cake)
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
