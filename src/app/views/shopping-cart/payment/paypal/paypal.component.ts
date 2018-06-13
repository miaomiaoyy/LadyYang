import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingCartService} from "../../../../services/shoppingcart.service.client";

@Component({
  selector: 'app-paypal',
  templateUrl:  './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})


export class PaypalComponent implements OnInit{

  @ViewChild('f') paypalform: NgForm;

  addScript: Boolean = false;
  finalAmount: Number = 10;

  constructor(private shoppingCartService: ShoppingCartService){

  }

  public ngOnInit(): void {
    (window as any).paypal.Button.render({
      env: 'sandbox',
      client: {
        sandbox: 'AVw_d7EtuYzjJWi0KuwGmR8SZEEqHA6FsnSbLX05D2Yzu3YE3z--2r_HO1E3EcSU3LuTaflvdxYKZic3',
        production: '<insert production client id>'
      },

      commit: true,
      payment: (data, action) => {
        return action.payment.create({
          payment: {
            transactions: [
              {amount: {total: this.shoppingCartService.total, currency: 'USD'}}
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then(function () {
            window.alert('Payment Complete!');
          }
        );
      }
    }, 'myContainerElement')
  }


  addPaypal(){
    this.addScript = true;
    return new Promise((data, reject) => {
      let sc = document.createElement('script');
      sc.src = "https://www.paypalobjects.com/api/checkout.js";
      sc.onload = data;
      document.body.appendChild(sc);
    });
  }
}

