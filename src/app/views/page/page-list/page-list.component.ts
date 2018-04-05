import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PageService} from '../../../service/page.service.client';
import {Page} from '../../../model/page.model.client';
import {WebsiteService} from '../../../service/website.service.client';
import {UserService} from '../../../service/user.service.client';
import {Website} from '../../../model/website.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pages: Page[] = [];

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private websiteService: WebsiteService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      // (params: any) => {
      //   this.userId = params['uid'];
      //   this.websiteId = params['wid'];
      params => {
        this.websiteService.findWebsitesById(params.wid).subscribe(
          (website: Website) => {
            if (website.developerId === params.uid) {
              this.websiteId = params.wid;
              this.userId = params.uid;
              this.pageService.findPageByWebsiteId(this.websiteId).subscribe(
                (pages: Page[]) => {
                  this.pages = pages;
                },
                (error: any) => {
                  console.log(error);
                }
              );
            } else {
              console.log('The user id is not the same.');
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    );

  }
}
