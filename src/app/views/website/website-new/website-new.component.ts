import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteForm: NgForm;
  name: String;
  description: String;
  userId: String;
  websites: Website[] = [];

  website: Website;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  createWebsite() {
    this.name = this.websiteForm.value.name;
    this.description = this.websiteForm.value.description;

    this.website = new Website(undefined, this.name, this.userId, this.description);
    this.websiteService.createWebsite(this.userId, this.website).subscribe(
      (data: any) => {
        this.website = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
  }

    ngOnInit() {
      this.activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

      this.websiteService.findWebsiteByUser(this.userId).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        });
  }

}
