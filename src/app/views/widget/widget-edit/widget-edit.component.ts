import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  widget: Widget;
  userId: String;

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

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // const preWidget = this.widgetService.findWidgetById(params['wgid']);
      // this.widget = Object.assign({}, preWidget);
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        }
      );
      this.userId = params['uid'];
    });
  }
}
