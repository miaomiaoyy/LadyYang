import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cake-customization',
  templateUrl: './cake-customization.component.html',
  styleUrls: ['./cake-customization.component.css']
})
export class CakeCustomizationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  formclick() {
    alert('change success');
  }
}
