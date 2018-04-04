import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  widget: Widget;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  updateWidget(changed_widget) {
    this.widgetService.updateWidget(changed_widget).subscribe(
      () => {
        // this.widget = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deleteWidget(widgetId) {
    this.widgetService.deleteWidget(widgetId).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // this.widget = this.widgetService.findWidgetById(params['wgid']);
      ///////// this.widget = Object.assign({}, preWidget);
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        }
      );
    });
  }

}
