import { Component, OnInit } from '@angular/core';
import {CakeDesc} from "../../../models/cake.model.client";

@Component({
  selector: 'app-cake-customization',
  templateUrl: './cake-customization.component.html',
  styleUrls: ['./cake-customization.component.css']
})
export class CakeCustomizationComponent implements OnInit {

  item: CakeDesc;
  inputText: string = "hello";

  constructor() {
    this.item = new CakeDesc();
    this.item.setText("Yang");
  }

  ngOnInit() {
  }

  formclick() {
    this.item.setText(this.inputText);
  }
}
