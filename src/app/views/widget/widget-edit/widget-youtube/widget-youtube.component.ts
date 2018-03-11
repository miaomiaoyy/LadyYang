import {Component, OnInit} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../../service/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  widget: Widget;
  widgetId: String;
  pageId: String;
  userId: String;

  constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute
  ) { }

  updateOrCreateWidget() {
    if (!this.widget._id) {
      alert('Create success');
      this.widgetService.createWidget(this.pageId, this.widget).subscribe(
        (widget: Widget) => {
          this.activatedRoute.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    } else {
      this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
        (widget: Widget) => {
          console.log(widget);
          this.widget = widget;
          this.activatedRoute.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    }
  }

  updateWidget() {
    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
      (widget: Widget) => {
        console.log(widget);
        this.widget = widget;
        this.activatedRoute.navigate(['../'], {relativeTo: this.activatedRoute});
      },
      (error: any) => console.log(error)
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      () => {
        this.activatedRoute.navigate(['../'], {relativeTo: this.activatedRoute});
      },
      (error: any) => console.log(error)
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
    this.pageId = params['pid'];
    this.userId = params['userId'];
    this.widgetId = params['wgid'];
    this.activatedRoute.params.subscribe(params => {
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        },
        (error: any) => console.log(error)
      );
    });
    }
  }

}
