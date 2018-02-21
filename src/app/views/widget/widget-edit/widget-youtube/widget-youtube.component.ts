import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../service/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';

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
  newWidget: Widget;
  widget: Widget;

constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wgid'];
        this.pageId = params['pid'];
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
    this.widget = this.widgetService.findWidgetById(this.widgetId);
    this.newWidget._id = '';
    this.newWidget.widgetType = 'YOUTUBE';
    this.newWidget.text = '';
    this.newWidget.width = '100%';
    this.newWidget.url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.newWidget._id;
    // this.widgetService.createWidget(this.pageId, this.newWidget);
    // this.router.navigate([this.newWidget.url]);
   // this.newWidget = this.widgetService.findWidgetsById(this.widgetId);
  }
  createWidgetController() {
    this.widgetService.createWidget(this.pageId, this.newWidget);
    this.router.navigate([this.newWidget.url]);
    console.log(this.widget);
  }
  updateWidgetController(widget: Widget) {
    this.widgetService.updateWidget(widget._id, widget);
    this.router.navigate([this.newWidget.url]);
    console.log(this.widget);
  }
  deleteWidgetController(widget: Widget) {
    this.widgetService.deleteWidget(this.widgetId);
    this.router.navigate([this.newWidget.url]);
  }
}

