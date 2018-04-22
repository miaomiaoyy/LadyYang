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
  cakeId: String;
cake: Cake;
  user: User;
  userId: String;
  isGuest: boolean;
  isAdded: boolean;

  constructor(private cakeService: CakeService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private shoppingCartService: ShoppingCartService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {

        this.userId = params['uid'];
        console.log('this is id'+ this.userId);
        //this.cakeId = params['cid'];
      }
    );

    // this.user = this.sharedService.user;
    // if (this.user != null) {
    //   this.userId = this.sharedService.user['_id'];
    //   console.log(this.userId);
    // }

    this.cakeService.showCake().subscribe(
      (cakes: Cake[]) => {
        this.cakes = cakes;
      }
    );
  }

  viewShoppingCart() {
    console.log('this is id yyyy test1'+ this.userId);
    this.route.navigate(['/shoppingcart/' + this.userId]);
    alert('shoppingcart');

  }


  addToCart(cakeId) {
    this.cakeId = cakeId;
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





    if (this.userId == null || this.userId == '') {
      this.route.navigate(['/login'], {relativeTo: this.activatedRoute});
    } else {
      console.log(this.userId, this.cakeId, 'ok');

      this.cakeService.findCakeById(this.cakeId).subscribe(
        (cake: Cake) => {
          this.cake = cake;
          console.log(cake, "cake is found and return");
        });

      this.shoppingCartService.addItem(this.userId, this.cake).subscribe(
        (data: any) => {
          console.log("addtoSpcart Yangyang");
          alert('add success, keep shopping');

          window.confirm('Item added!');
        });
    }
  }

  likeCake(cakeId) {
    alert("liked");
  }
}
