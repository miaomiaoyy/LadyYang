import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../service/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../service/page.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgets: Widget[] = [];
  widgetType: String;
  typeIsHeader: boolean;
  typeIsYouTuBe: boolean;
  typeIsImage: boolean;
  page: Page;

  constructor(
    private widgetService: WidgetService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['uid'];
        this.pageId = params['pid'];
      }
    );

    this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
    this.page = this.pageService.findPageById(this.pageId);
    console.log(this.widgets);

  }
  updateURL(url: String) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/4jtVx4_QpKA');
  }
}

