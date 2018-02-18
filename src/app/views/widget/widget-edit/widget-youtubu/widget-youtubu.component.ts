import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../service/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-youtubu',
  templateUrl: './widget-youtubu.component.html',
  styleUrls: ['./widget-youtubu.component.css']
})
export class WidgetYoutubuComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  newWidget: Widget;

constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wid'];
        this.pageId = params['pid'];
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
    this.newWidget._id = '';
    this.newWidget.widgetType = 'HEADER';
    this.newWidget.text = '';
    this.newWidget.width = '100%';
    this.newWidget.url = '"/user/" + this.userId + "/website/" + this.websiteId + "/page/" + this.pageId + "/widget/" + newWidget._id';
    this.widgetService.createWidget(this.pageId, this.newWidget);
    this.router.navigate([this.newWidget.url]);

    this.newWidget = this.widgetService.findWidgetsById(this.widgetId);
  }
}
