import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  website: Website;
  websites: Website[] = [];

  constructor(
    private websiteService: WebsiteService,
    private activatedRoute: ActivatedRoute
  ) { }

  updateWebsite() {
    this.website = this.websiteService.updateWebsite(this.website._id, this.website);
    console.log(this.website);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.website._id);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.website = this.websiteService.findWebsiteById(params['websiteId']);
      this.websites = this.websiteService.findWebsitesByUser(params['userId']);
    });
  }


}
