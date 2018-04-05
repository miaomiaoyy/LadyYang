import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model.client';
import {WidgetService} from '../../../../service/widget.service.client';
import {PageService} from '../../../../service/page.service.client';
import {Page} from '../../../../model/page.model.client';
import {WebsiteService} from '../../../../service/website.service.client';
import {Website} from '../../../../model/website.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: String;
  websiteId: String;
  widgetId: String;
  pageId: String;
  widget: Widget = {
    _id: '', widgetType: '', name: 'name', pageId: '', size: '1', text: '', url: '', width: '100%',
    height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private widgetService: WidgetService,
              private pageService: PageService,
              private websiteService: WebsiteService) {
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
                          console.log('widget-header widget id= ' + widget._id);
                        } else {
                          console.log('Two user id do not match.');
                        }
                      }
                    );
                  } else {
                    console.log('Two website id do not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
    console.log('widget header widget type = ' + this.widget.widgetType);
    // this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

  // updateWidget(widget) {
  //   console.log('hello this is update widget');
  //   console.log('widget text= ' + this.widget.text);
  //   console.log('widget size=' + this.widget.size);
  //   this.widgetService.updateWidget(this.widgetId, this.widget);
  //   const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
  //   this.router.navigate([url]);
  // }

  updateWidget(widget: Widget) {
    console.log('this is update header widget in ts');
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
  //   console.log('this is delete widgte!!!');
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
