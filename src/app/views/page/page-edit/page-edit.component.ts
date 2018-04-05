import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PageService} from '../../../service/page.service.client';
import {Page} from '../../../model/page.model.client';
import {UserService} from '../../../service/user.service.client';
import {WebsiteService} from '../../../service/website.service.client';
import {Website} from '../../../model/website.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  // properties
  userId: String;
  pageId: String;
  updatedPage: Page = {_id: '', name: '', websiteId: '', description: ''};
  // updatedPage: Page[] = [];
  name: String;
  websiteId: String;
  description: String;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      // (params: any) => {
      //   this.userId = params['uid'];
      //   this.pageId = params['pid'];
      //   this.websiteId = params['wid'];
      // }
      params => {
        this.pageService.findPageById(params.pid).subscribe(
          (page: Page) => {
            if (page.websiteId === params.wid) {
              this.websiteService.findWebsitesById(page.websiteId).subscribe(
                (website: Website) => {
                  if (website.developerId === params.uid) {
                    this.userId = params.uid;
                    this.pageId = params.pid;
                    this.websiteId = params.wid;
                    this.updatedPage = page;
                  } else {
                    // throw error message
                    console.log('The user id do not match');
                  }
                }
              );
            } else {
              // throw error message
              console.log('The website id don not match');
            }
          }
        );
      }
    );
    // this.updatedPage = this.pageService.findPageById(this.pageId);
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe(
      (page: Page) => {
        const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
    // const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
    // console.log('pgae-edit ---------- page url= ' + url);
    // this.router.navigate([url]);
  }

  updatePage(page) {
    if (page.name !== '' && page.description !== '') {
      this.pageService.updatePage(page._id, page).subscribe(
        (page: Page) => {
          const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
          this.router.navigate([url]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
