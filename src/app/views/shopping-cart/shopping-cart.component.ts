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
  public cart = new ShoppingCart(null, null, null);
  userId: String;
  cartId: String;
  public totalPrice: number;
  quantity: number;
  totalCost: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;
  public image: any;


  constructor(private shoppingCartService: ShoppingCartService, private cakeService: CakeService,
              private router: Router, private activatedRoute: ActivatedRoute) {

  }

  public emptyCart(cartId) {
    this.shoppingCartService.empty(cartId);
  }


  removeCake(cake) {
    this.shoppingCartService.removeFromCart(this.userId, cake._id);
  }

  checkout() {
    this.router.navigate(['shoppingcart/' + this.userId + '/payment']);
    // alert('Security Payment');

  }
  paypal() {
    // this.router.navigate(['./payment']);
    alert('Security Paypal');
  }

  getTotalPrice() {
    const totalCost: Array<number> = []
    const quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.cart.cakes.forEach((item, i) => {
      // intPrice = (item.price)
      // intQuantity = (item.quantity)
      intPrice = 1;
      intQuantity = 1;
      totalCost.push(intPrice)
      quantity.push(intQuantity);
      // console.log(item._id, 'kittyyyyyyyy');
      console.log(this.cakeService.findPicForCake(item._id), 'hey someone');
      // console.log((i), 'hey someone2');
      this.image = item.url;

    })


    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item;
    }, 0);
    this.shoppingCartService.total = this.totalPrice;
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item;
    }, 0);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.cartId = params['cid'];

      //  this.cakeService.findPicForCake('5add2963d9d3b0da72aa37b7').subscribe((cake) => {
      //   console.log(cake, "call here");
      // });
        this.shoppingCartService.findCartForUser(this.userId).subscribe(
          (myCart: ShoppingCart) => {
            this.cart = myCart;
            this.cart.cakes.forEach((item, i) => {
              // intPrice = (item.price)
              // intQuantity = (item.quantity)
              // this.cakeService.findCakeById(item._id).subscribe((cake: any) => {
              //   console.log(cake, item, "what is cake");
              //   item.url = cake.url;
              //   item._id = cake._id;
              //   item.name = cake.name;
              // });

            });

            // console.log(myCart, 'find cart!!!!!!!');
            return myCart;
          }
        );
      });
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




  removeProduct(cake: Cake) {
    return this.shoppingCartService.removeFromCart(this.userId, cake._id).subscribe((cart : any) => {
      this.cart = cart;
      console.log('remove sucess', cart);
    });

  }


  findUrl(cakeId: String){

    // console.log(cakeId);
    console.log("findcakeforKitty", this.cakeService.findPicForCake(cakeId));
    // return this.cakeService.findPicForCake(cakeId).subscribe((url) =>
    // console.log(url));
  }

}
