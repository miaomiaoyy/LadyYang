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
    // this.activatedRoute.params.subscribe(
    //   (params: any) => {
    //     this.userId = params['uid'];
    //     console.log(this.userId, 'userId');
    //   });
    // if (this.userId !== 'undefined') {
    //   this.cakeService.findCakeByUser(this.userId).subscribe(
    //     (cakes: Cake[]) => {
    //       this.cakes = cakes;
    //       console.log(this.cakes, 'cakesList');
    //     }
    //   );
    // }
    // if (this.cakes == null) {
    //       console.log(this.cakes, 'cakesList');
    //       this.cakeService.showCake();
    //       this.cakes.push( new Cake('934', '88', 'Hellokitty',
    //         'Hello Kitty World',
    //         'http://joyeuxbakery.com/pikachu-cakes/#http%3A%2F%2Fjoyeuxbakery.com%2Fwp-content%2Fuploads%2FPikachu-Sitting-1024x790.jpg'));
    //   }
  }
  showcake() {
    this.cakeService.showCake();
  }
}



