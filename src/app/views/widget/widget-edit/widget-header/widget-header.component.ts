import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  widget: Widget;
  sizeValid: boolean;

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
