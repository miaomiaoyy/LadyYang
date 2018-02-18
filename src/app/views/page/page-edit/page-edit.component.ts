import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../service/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: {}
  websiteId: String;
  pageId: String;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];

      }
    );
    this.pageService.findPageById(this.pageId);
    this.pageService.deletePage(this.pageId);
  }

}

