import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../service/website.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  websiteId: string;
  website: Website;
  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private router: Router) {
    this.website = new Website('', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.websiteService.findWebsiteById(this.websiteId).subscribe(
        (website: Website) => {
          this.website = website;
        },
        (error: any) => console.log(error)
      );
      this.websiteService.findWebsitesByUser(params['uid']).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        },
        (error: any) => console.log(error)
      );
    });
  }

  updateWebsite() {
    this.websiteService.updateWebsite(this.websiteId, this.website).subscribe(
      (website: Website) => {
        this.website = website;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe(
      () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }
}
