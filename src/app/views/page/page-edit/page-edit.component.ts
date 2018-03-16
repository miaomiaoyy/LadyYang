import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../service/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: Page;
  userId: String;

  constructor(private pageService: PageService,
              private route: ActivatedRoute) { }

  updatePage(changed_page) {
    this.pageService.updatePage(changed_page).subscribe();
  }

  deletePage(pageId) {
    this.pageService.deletePageById(pageId).subscribe();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      // const prePage = this.pageService.findPageById(params['pid']);
      // this.page = Object.assign({}, prePage);
      this.pageService.findPageById(params['pid']).subscribe(
        (page: Page) => {
          this.page = page;
        }
      );
      this.userId = params['uid'];
    });
  }

}
