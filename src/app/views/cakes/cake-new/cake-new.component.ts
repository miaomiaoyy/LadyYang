import {Component, OnInit, ViewChild} from '@angular/core';
import {CakeService} from '../../../services/cake.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Cake} from '../../../models/cake.model.client';


@Component({
  selector: 'app-cake-new',
  templateUrl: './cake-new.component.html',
  styleUrls: ['./cake-new.component.css']
})
export class CakeNewComponent implements OnInit {

  constructor(private cakeService: CakeService, private activatedRoute: ActivatedRoute, private router: Router) { }
  @ViewChild('f') cakeForm: NgForm;
  name: String;
  description: String;
  cakeId: String;
  userId: String;
  cakes: Cake[] = [];
  cake: Cake;
  url: String;

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.cakeId = params['cid'];
        this.userId = params['uid'];
      }
    );
  }

  createCake() {
      // this.cakeId =  '_' + Math.random().toString(36).substr(2, 9);
      this.name = this.cakeForm.value.name;
      this.description = this.cakeForm.value.description;
      this.url = this.cakeForm.value.url;
      this.cake = new Cake( null, this.userId, this.name, this.description, this.url);
      this.cakeService.createCake(this.cake).subscribe(
        (data: any) => {
          this.cake = data;
          console.log("get cake", this.cake);
          this.router.navigate(['/cakes/top10'], {relativeTo: this.activatedRoute});
        });
    }
}
