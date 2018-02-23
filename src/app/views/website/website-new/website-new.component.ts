import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteForm: NgForm;
  userId: String;
  websites: Website[] = [];
  name: String;
  description: String;
  website: Website;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }
  getWebsite() {
    this.name = this.websiteForm.value.websitename;
    this.description = this.websiteForm.value.websitedescription;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    this.website = new Website((new Date()).getTime() + '', '', this.userId, '');
    this.website.name = this.websiteForm.value.websitename;
    this.website.description = this.websiteForm.value.websitedescription;
    this.websiteService.createWebsite(this.userId, this.website);
    this.websites = this.websiteService.findWebsitesByUser2(this.userId);
    console.log(this.websites);
  }

  createWebsiteController(website: Website) {
      this.websiteService.createWebsite(this.userId, website);
    }
  }

