import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})



export class WidgetImageComponent implements OnInit {
  @ViewChild('f') imageForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  text: String;
  url: String;
  width: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  delete() {
    if (this.widgetId !== undefined) {
      this.widgetService.deleteWidget(this.widgetId).subscribe(
        () => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    } else {
      this.widgetService.deleteWidget(this.widgetId).subscribe(
        () => {
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    }
  }


  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.userId = params['userId'];
        this.widgetId = params['wgid'];
        this.widgetService.findWidgetById(params['wgid']).subscribe(
          (widget: Widget) => {
            this.widget = widget;
          },
          (error: any) => console.log(error)
        );
      });
      console.log('init url: ' + this.widget.url);
    }

  //
  // updateWidgetController(widget: Widget) {
  //   this.widgetService.updateWidget(widget._id, widget);
  //   this.router.navigate([this.newWidget.url]);
  // }
  deleteWidgetController(widget: Widget) {
    this.widgetService.deleteWidget(this.widgetId);
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
  }
}
