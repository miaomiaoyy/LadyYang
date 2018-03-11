import {Component, OnInit} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updateOrCreateWidget() {
    if (!this.widget._id) {
      alert('Create success');
      this.widgetService.createWidget(this.pageId.toString(), this.widget).subscribe(
        (widget: Widget) => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    } else {
      this.widgetService.updateWidget(this.widgetId.toString(), this.widget).subscribe(
        (widget: Widget) => {
          console.log(widget);
          this.widget = widget;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    }
  }

  updateWidget() {
    this.widgetService.updateWidget(this.widgetId.toString(), this.widget).subscribe(
      (widget: Widget) => {
        console.log(widget);
        this.widget = widget;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      },
      (error: any) => console.log(error)
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      },
      (error: any) => console.log(error)
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
    this.pageId = params['pid'];
    this.userId = params['userId'];
    this.widgetId = params['wgid'];
    this.activatedRoute.params.subscribe(() => {
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        },
        (error: any) => console.log(error)
      );
    });
    });
  }

}
