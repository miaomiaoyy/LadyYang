import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../model/page.model.client';
import {WebsiteService} from '../../../service/website.service.client';
import {Website} from '../../../model/website.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  // newPage: Page [] = [];
  newPage: Page = {_id: '', name: '', websiteId: '', description: ''};

  constructor(private router: Router,
              private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      // (params: any) => {
      // this.userId = params['uid'];
      // this.websiteId = params['wid'];
      // }
      params => {
        this.websiteService.findWebsitesById(params.wid).subscribe(
          (website: Website) => {
            if (website.developerId === params.uid) {
              this.websiteId = params.wid;
              this.userId = params.uid;
            } else {
              console.log('The user id do not match.');
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    );
  }

  createNewPage(page) {
    if (page.name === '' || page.title === '') {
      return;
    }
    if (page.name !== '' && page.description !== '') {
      console.log('page new -------- page name= ' + page.name);
      console.log('page new -------- page description= ' + page.description);
      this.pageService.createPage(this.websiteId, page).subscribe(
        (page: Page) => {
          const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
          console.log('page new -------- url = ' + url);
          this.router.navigate([url]);
        }
      );
      // const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
      // console.log('page new -------- url = ' + url);
      // this.router.navigate([url]);
    }
  }
}


