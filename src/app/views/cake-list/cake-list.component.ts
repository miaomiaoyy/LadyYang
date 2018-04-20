import { Component, OnInit } from '@angular/core';
import {CakeService} from '../../services/cake.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Cake} from '../../models/cake.model.client';
import {ShoppingCartService} from '../../services/shoppingcart.service.client';
import {User} from '../../models/user.model.client';
import {SharedService} from '../../services/shared.service';


@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.css']
})
export class CakeListComponent implements OnInit {
  cakes: Cake[] = [];
  cakeId : String;
  cake: Cake;
  user: User;
  userId: String;
  isGuest; boolean;
  isAdded: boolean;

  constructor(private cakeService: CakeService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private shoppingCartService: ShoppingCartService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    if(this.user != null) {
      this.userId = this.sharedService.user['_id'];
    }

    this.cakeService.showCake().subscribe(
      (cakes: Cake[]) => {
        this.cakes = cakes;
      }
    );
  }

  viewShoppingCart() {
    // this.route.navigate(['/shoppingcart']);
    alert('shoppingcart');
  }


  addToCart(userId, cakeId) {

    // if (this.user === '' || this.user === 'undefined') {
    //   this.isGuest = true;
    //   return;
    // } else {
    //   this.isGuest = false;
    // }
    //
    //
    // for (let _i = 0; _i < this.user.cart.length; _i++) {
    //   const currItem = this.user.cart[_i];
    //   if (currItem._id === this.item._id) {
    //     currItem.quantity++;
    //     isAdded = true;
    //   }
    // }
    // if(!this.isAdded) {
    //   this.user.cart.push(this.item);
    // }
    // this.shoppingCartService.calculatePrice(currItem);

    this.shoppingCartService.addToShoppingCart(userId, cakeId).subscribe(
      (data: any) => {
        console.log( "addtoSpcart Yangyang");
        alert('add success, keep shopping');
        // this.route.navigate(['/shoppingcart']);

        window.confirm('Item added!');
      });
  }
}
