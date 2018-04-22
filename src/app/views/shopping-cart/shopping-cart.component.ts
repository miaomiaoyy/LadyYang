import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCart} from '../../models/shoppingcart.model.client';

import {ShoppingCartService} from '../../services/shoppingcart.service.client';
import {Cake} from '../../models/cake.model.client';
import {CakeService} from '../../services/cake.service.client';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from "../../models/widget.model.client";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart = [];
  userId: String;
  cartId: String;
  cakes: Cake[];
  public totalPrice: number;
  quantity: number;
  totalCost: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;


  constructor(private shoppingCartService: ShoppingCartService, private cakeService: CakeService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }


  public emptyCart(cartId) {
    this.shoppingCartService.empty(cartId);
  }


  removeCake(cake) {
    this.shoppingCartService.removeFromCart(cake);
  }

  checkout() {
    // this.router.navigate(['./payment']);
    alert('Security Payment');
    //this.router.navigate(['/payment']);
  }

  getTotalPrice() {
    const totalCost: Array<number> = []
    const quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.cart.forEach((item, i) => {
      intPrice = (item.price)
      intQuantity = (item.quantity)
      totalCost.push(intPrice)
      quantity.push(intQuantity);
    })

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item;
    }, 0)
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item;
    }, 0);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.cartId = params['cid'];
      }
    );
    console.log(this.userId, 'why u r undefined?');
    this.shoppingCartService.findCartForUser(this.userId).subscribe(
      (myCart: ShoppingCart) => {
              console.log(myCart, 'find cart!!!!!!!');
              return myCart;
            }
    );
  }
    // console.log(this.userId, "userIs");
    // console.log(this.cartId, "cart");
    // if (this.userId === null|| this.userId === 'undefined') {
    //   this.router.navigate(['/login']);
    // } else {
    //   console.log('enter findCartForUser', this.cart);
    //   this.shoppingCartService.findCartForUser(this.userId).subscribe(
    //     (myCart: ShoppingCart) => {
    //       console.log(myCart, 'find cart!!!!!!!');
    //       return myCart;
    //     }
    //   );




  removeProduct() {
    console.log('remove sucess');
  }
}
