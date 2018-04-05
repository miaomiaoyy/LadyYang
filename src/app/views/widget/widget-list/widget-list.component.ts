import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DomSanitizer} from '@angular/platform-browser';
import {Widget} from '../../../model/widget.model.client';
import {WidgetService} from '../../../service/widget.service.client';
import {PageService} from '../../../service/page.service.client';
import {UserService} from '../../../service/user.service.client';
import {WebsiteService} from '../../../service/website.service.client';
import {Website} from '../../../model/website.model.client';
import {Page} from '../../../model/page.model.client';
import {environment} from '../../../../environments/environment';

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

  // baseUrl = environment.baseUrl;

  constructor(private widgetService: WidgetService,
              private pageService: PageService,
              private websiteService: WebsiteService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.pageService.findPageById(params.pid).subscribe(
          (page: Page) => {
            if (page.websiteId === params.wid) {
              // console.log(1);
              this.websiteService.findWebsitesById(page.websiteId).subscribe(
                (website: Website) => {
                  if (website.developerId === params.uid) {
                    // console.log(2);
                    this.userId = params.uid;
                    this.websiteId = params.wid;
                    this.pageId = params.pid;
                    // console.log('pageid= ' + this.pageId);
                    this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
                      (widgets: Widget[]) => {
                        this.widgets = widgets;
                      },
                      (error: any) => {
                        console.log(error);
                      }
                    );
                  } else {
                    console.log('user id is not the same');
                  }
                }
              );
            } else {
              console.log('website id is not the same');
            }
          }
        );
      }
    );
    // console.log('widget list pid = ' + this.pageId);
    // this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
  }

  orderWidgets(indexes) {
    console.log('widget list pid = ' + this.pageId);
    console.log('widget list order widget.ts');
    // call widget service function to update widget as per index
    this.widgetService.orderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        (data) => console.log(data)
      );
  }

  modifyYoutubeUrl(url) {
    // console.log('youtube url before = ' + url);
    const youtubeUrl = url.replace('youtu.be', 'youtube.com/embed');
    // console.log('youtube url= ' + youtubeUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}
