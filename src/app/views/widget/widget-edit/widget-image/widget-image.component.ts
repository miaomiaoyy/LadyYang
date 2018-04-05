import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model.client';
import {PageService} from '../../../../service/page.service.client';
import {WebsiteService} from '../../../../service/website.service.client';
import {UserService} from '../../../../service/user.service.client';
import {Page} from '../../../../model/page.model.client';
import {Website} from '../../../../model/website.model.client';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  baseUrl = environment.baseUrl;

  widget: Widget = {
    _id: '', widgetType: '', name: 'name', pageId: '', size: '', text: '', url: '', width: '100%',
    height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  };

  constructor(private widgetService: WidgetService,
              private pageService: PageService,
              private websiteService: WebsiteService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    // this.activatedRoute.params.subscribe(
    //   (params: any) => {
    //     this.widgetId = params['wgid'];
    //     this.pageId = params['pid'];
    //     this.userId = params['uid'];
    //     this.websiteId = params['wid'];
    //     console.log('image widget id= ' + this.websiteId);
    //     this.widgetService.findWidgetById(this.widgetId).subscribe(
    //       (widget: Widget) => {
    //         this.widget = widget;
    //       },
    //       (error: any) => {
    //         console.log(error);
    //       }
    //     );
    //   }
    // );
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
                          console.log('Two user id do not match');
                        }
                      }
                    );
                  } else {
                    console.log('Two website id do not match');
                  }
                }
              );
            }
          }
        );
      }
    );
    console.log('widget image widget type = ' + this.widget.widgetType);
    console.log('widget image widget url = ' + this.widget.url);
    // this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

  // updateWidget() {
  //   this.widgetService.updateWidget(this.widgetId, this.widget);
  //   const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
  //   this.router.navigate([url]);
  // }

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

  // deleteWidget() {
  //   this.widgetService.deleteWidget(this.widgetId);
  //   const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
  //   this.router.navigate([url]);
  // }

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
}
