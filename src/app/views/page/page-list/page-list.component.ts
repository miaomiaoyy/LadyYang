import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  websiteId: String;
  pages: Page[] = [];
  userId: String;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.userId = params['uid'];
      }
    );
    this.pageService.findPageByWebsiteId(this.websiteId).subscribe(
      (pages: Page[]) => {
        this.pages = pages;
      }
    );
  }

}
