import { Component, OnInit } from '@angular/core';
import {CakeService} from '../../services/cake.service.client';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {

  constructor(private cakeService: CakeService) { }

  ngOnInit() {
    this.cakeService.showCake();
  }

}
