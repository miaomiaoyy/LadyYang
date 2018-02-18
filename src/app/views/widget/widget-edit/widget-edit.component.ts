import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  widget: Widget;
  widgetId: String;
  pageId: String;

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wid'];
        this.pageId = params['pid'];
      }
    );

    this.widgetService.findWidgetsById(this.widgetId);
    this.widgetService.updateWidget(this.widgetId, this.widget);
    this.widgetService.deleteWidget(this.widgetId);
  }
}


