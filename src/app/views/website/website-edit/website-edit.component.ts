import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  website: Website;
  userId: String;
  websites: Website[] = [];
  websiteId: String;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  updateWebsite(changed_website) {
    this.websiteService.updateWebsite(changed_website).subscribe(
      (data: any) => {
        this.website = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deleteWebsite(websiteId) {
    this.websiteService.deleteWebsite(websiteId).subscribe(
      ()  => {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      // const preWebsite = this.websiteService.findWebsiteById(params['wid']);
      // this.website = Object.assign({}, preWebsite);
      this.websiteService.findWebsiteById(params['wid']).subscribe(
        (website: Website) => {
          this.website = website;
        }
      );
      // this.websites = this.websiteService.findWebsiteByUser(this.userId);
      this.websiteService.findWebsiteByUser(this.userId).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        }
      );
    });
  }

}
