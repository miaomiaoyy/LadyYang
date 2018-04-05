import {Component, OnInit} from '@angular/core';
import {Widget} from '../../../model/widget.model.client';
import {WidgetService} from '../../../service/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../service/page.service.client';
import {Page} from '../../../model/page.model.client';
import {Website} from '../../../model/website.model.client';
import {WebsiteService} from '../../../service/website.service.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widget: Widget = {
    _id: '', widgetType: '', name: 'name', pageId: '', size: '1', text: '', url: '', width: '100%',
    height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  };
  widgetId: String;
  userId: String;
  websiteId: String;
  pageId: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
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
                        } else {
                          console.log('Two user ID does not match.');
                        }
                      }
                    );
                  } else {
                    console.log('Two Website ID does not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
    console.log('type          widget-edit widget type = ' + this.widget.widgetType);
    console.log('url           widget-edit url = ' + this.widget.url);
    console.log('text          widget-edit text = ' + this.widget.text);
  }

}
