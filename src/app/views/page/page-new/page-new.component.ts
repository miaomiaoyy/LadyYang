import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../service/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
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
  createPage() {
    this.pageName = this.PageForm.value.pagename;
    this.pageTitle = this.PageForm.value.pagetitle;
    const new_page = {
      _id: (new Date()).getTime() + '',
      name: this.pageName,
      websiteId: this.websiteId,
      title: this.pageTitle
    };
    this.pageService.createPage(this.websiteId, new_page);
  }
  updatePageConntroller() {

    this.pageService.updatePage(this.pageId, this.pageName, this.pageTitle);
  }

}


