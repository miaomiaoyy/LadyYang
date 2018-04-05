import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {WebsiteService} from '../../../service/website.service.client';
import {Website} from '../../../model/website.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: String;
  websites: Website[] = [];

  // websites: any[] = [{ _id: '', name: '', developerId: '', description: '' }];
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        // this.userId = params['uid'];
        this.userId = params.uid;
        console.log('whats the user id = ' + this.userId);
        return this.websiteService.findWebsitesByUser(this.userId).subscribe(
          (websites: Website[]) => {
              this.websites = websites;
          }
        );
      }
    );

    // this.websites = this.websiteService.findWebsitesByUser(this.userId);
    // console.log('website list--- user id' + this.userId);
    // for (let i = 0; i < this.websites.length; i++ ) {
    //   console.log('website list--- website id= ' + this.websites[i]._id);
    // }
  }
}
