import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {CakeService} from "../../../services/cake.service.client";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('f') paymentForm: NgForm;
  errorFlag = false;
  errorMsg = 'Your cvv number is wrong!';
  firstName: String;
  lastName: String;
  items: any;
  cvv: String;
  expirationDate: String;
  cardNumber: String;
  userId: String;
  sold: string;
  user: any;
  item: any;
  soldItem: any;
  count: number;

  constructor(private sharedService: SharedService, private router: Router,
              private userService: UserService, private cakeService: CakeService) {
  }

  ngOnInit() {
    this.count = 0;
    this.soldItem = [];
    this.sold = '';
    this.userId = this.sharedService.user['_id'];
    this.userService.findUserById(this.userId).subscribe((returnedUser: any) => {
      this.items = returnedUser.cart;
    });
    this.firstName = this.sharedService.user['firstName'];
    this.lastName = this.sharedService.user['lastName'];
    this.expirationDate = this.sharedService.user['expirationDate'];
    this.cardNumber = this.sharedService.user['cardNumber'];
  }

  check() {
    if (this.paymentForm.value.cardNumber === this.cardNumber &&
      this.paymentForm.value.cvv !== this.sharedService.user['cvv']) {
      this.errorFlag = true;
    } else {
      if (this.items.length !== 0) {
        for (let i = 0; i < this.items.length; i++) {
          this.cakeService.findCakeById(this.items[i]['_id']).subscribe((returnItem: any) => {
            if (returnItem._id === undefined || returnItem._id === '') {
              this.items[i]['_id'] = this.userId;
            }
          });
        }

        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i]['_id'] !== undefined) {
            this.soldItem.push(this.items[i]);
          }
        }

        if (this.soldItem === undefined || this.soldItem.length === 0) {
          this.user = this.sharedService.user;
          this.user['cart'] = [];
          this.userService.updateUser(this.user).subscribe((returnUser: any) => {
          });
          for (let i = 0; i < this.items.length; i++) {
            this.item = this.items[i];
            //this.item['_id'] = this.userId;
            this.cakeService.updateCake(this.items[i]['_id'], this.item).subscribe((Item: any) => {
              console.log(Item);
            });
          }
          this.router.navigate(['/user/profile']);
        } else {
          for (let i = 0; i < this.soldItem.length; i++) {
            this.sold += ' ' + this.soldItem[i]['name'] + ' ';
          }
          alert('Item(s): ' + this.sold + ' sold.');
          this.router.navigate(['/user/shoppingcrt']);
        }
      } else {
        alert('No item in your cart!');
        this.router.navigate(['/loggedinhome/user']);
      }
    }
  }
}
