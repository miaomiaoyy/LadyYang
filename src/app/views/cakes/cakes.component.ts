import {Component, OnInit, ViewChild} from '@angular/core';
import {CakeService} from '../../services/cake.service.client';
import {Website} from '../../models/website.model.client';
import {NgForm} from '@angular/forms';
import {Cake} from '../../models/cake.model.client';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../services/website.service.client';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {

  constructor(private cakeService: CakeService,
              private activatedRoute: ActivatedRoute) {
  }

  userId: String;
  cakes: Cake[] = [];


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      });
    if (this.userId) {
      this.cakeService.findCakeByUser(this.userId).subscribe(
        (cakes: Cake[]) => {
          this.cakes = cakes;
        }
      );
    } else {
      this.cakeService.showCake();
    }
  }
}


