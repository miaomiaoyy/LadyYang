import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model.client';
import {PageService} from '../../../../service/page.service.client';
import {WebsiteService} from '../../../../service/website.service.client';
import {UserService} from '../../../../service/user.service.client';
import {Page} from '../../../../model/page.model.client';
import {Website} from '../../../../model/website.model.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget = {
    _id: '', widgetType: '', name: 'name', pageId: '', size: '', text: '', url: '', width: '100%',
    height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  };

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private websiteService: WebsiteService,
              private userService: UserService,
              private router: Router) {
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
                          console.log('Two user id do not match');
                        }
                      }
                    );
                  } else {
                    console.log('Two website ID does not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
  }


  // deleteWidget() {
  //   this.widgetService.deleteWidget(this.widgetId);
  //   const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
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

  // updateWidget(widget: Widget) {
  //   this.widgetService.updateWidget(widget._id, widget);
  //   const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
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
}
