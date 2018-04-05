import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {WidgetService} from '../../../../service/widget.service.client';
import {Widget} from '../../../../model/widget.model.client';
import {PageService} from '../../../../service/page.service.client';
import {WebsiteService} from '../../../../service/website.service.client';
import {UserService} from '../../../../service/user.service.client';
import {Page} from '../../../../model/page.model.client';
import {Website} from '../../../../model/website.model.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  widget: Widget = {
    _id: '', widgetType: '', name: '', pageId: '', size: '', text: '', url: '', width: '100%',
    height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  };
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;

  constructor(private widgetService: WidgetService, private pageService: PageService, private websiteService: WebsiteService,
              private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.widgetService.findWidgetById(params.wgid).subscribe(
          (widget: Widget) => {
            if (widget.pageId === params.pid) {
              this.pageService.findPageById(widget.pageId).subscribe(
                (page: Page) => {
                  if (page.websiteId === params.wid) {
                    this.websiteService.findWebsitesById(page.websiteId).subscribe(
                      (website: Website) => {
                        if (website.developerId === params.uid) {
                          this.userId = params.uid;
                          this.websiteId = params.wid;
                          this.pageId = params.pid;
                          this.widgetId = params.wgid;
                          this.widget = widget;
                        } else {
                          console.log('Two user ID do not match.');
                        }
                      }
                    );
                  } else {
                    console.log('Two website ID dp not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (widget: Widget) => {
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateWidget(widget: Widget) {
    this.widgetService.updateWidget(this.widgetId, widget).subscribe(
      (widget: Widget) => {
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
