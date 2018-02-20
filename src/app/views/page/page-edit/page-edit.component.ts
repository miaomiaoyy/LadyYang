import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../service/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Page} from '../../../models/page.model.client';


@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') PageForm: NgForm;
  page: Page[] = [];
  websiteId: String;
  pageId: String;
  useId: String;
  pageName: String;
  pageTitle: String;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.useId = params['uid'];
      }
    );
    this.page = this.pageService.findPageByWebsiteId(this.websiteId);
  }
  deletePageController() {
    this.pageService.deletePageById(this.pageId);
  }
  updatePageConntroller() {
    this.pageName = this.PageForm.value.pagename;
    this.pageTitle = this.PageForm.value.pagetitle;
    this.pageService.updatePage(this.pageId, this.pageName, this.pageTitle);
  }

}

