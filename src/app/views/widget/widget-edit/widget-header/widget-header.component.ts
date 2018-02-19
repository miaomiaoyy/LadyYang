import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';


@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {


  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wgid'];
        this.pageId = params['pid'];
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );

    this.widgetService.findWidgetsById(this.widgetId);
    this.widgetService.findWidgetsByPageId(this.pageId);
  }
  updateWidgetController() {
    this.widgetService.updateWidget(this.widgetId, this.widget);
  }
  deleteWidgetController() {
    this.widgetService.deleteWidget(this.widgetId);
  }
}
