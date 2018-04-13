import {Component, OnInit, ViewChild} from '@angular/core';
import {CakeService} from '../../services/cake.service.client';
import {Website} from '../../models/website.model.client';
import {NgForm} from '@angular/forms';
import {Cake} from '../../models/cake.model.client';

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
