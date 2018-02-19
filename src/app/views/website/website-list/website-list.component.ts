import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  user: User;
  userId: String;
  websiteId: String;
  websites: Website[] = [];
  foundWebsite = Website;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }
  OnInit() {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        // this.user._id = this.userId;
      }
    );

    this.websites = this.websiteService.findWebsitesByUser2(this.userId);
  }
  createNewWebsite(website) {
    this.websiteService.createWebsite(this.userId, website);
  }
}
