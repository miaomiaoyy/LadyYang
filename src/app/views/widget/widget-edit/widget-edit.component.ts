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
  widgetType: String;

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wgid'];
        this.pageId = params['pid']
        this.widget = new Widget('xx', 'xx', this.pageId, 'xx', 'xx', 'xx', 'xx');
      }
    );
    if (this.widgetId === 'header') {
      this.widget.widgetType = 'HEADER';
    } else if ( this.widgetId === 'image') {
      this.widget.widgetType = 'IMAGE';
    } else if (this.widgetId === 'youtube') {
      this.widget.widgetType = 'YOUTUBE';
    } else {
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    }
    alert(this.widgetId);
    // this.widgetService.updateWidget(this.widgetId, this.widget);
    // this.widgetService.deleteWidget(this.widgetId);
  }
}


