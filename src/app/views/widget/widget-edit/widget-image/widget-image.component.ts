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
      this.widgetService.deleteWidget(this.widgetId);
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  updateOrCreate() {
    this.widget.text = this.imageForm.value.imageText;
    if (this.imageForm.value.imageUrl !== '') {
      this.widget.url = this.imageForm.value.imageUrl;
    } else if (this.widgetId !== undefined) {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      return;
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      return;
    }
    this.widget.width = this.imageForm.value.imageWidth;
    this.widget.widgetType = 'IMAGE';
    if (this.widgetId !== undefined) {
      this.widgetService.updateWidget(this.widgetId, this.widget);
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.widgetService.createWidget(this.pageId, this.widget);
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      if (params['wgid'] !== undefined) {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
      } else {
        this.widget = new Widget('', '', '', '', '', '', '');
      }
      this.text = this.widget.text;
      this.url = this.widget.url;
      this.width = this.widget.width;
    });
  }


  // updateWidgetController(widget: Widget) {
  //   this.widgetService.updateWidget(widget._id, widget);
  //   this.router.navigate([this.newWidget.url]);
  // }
  deleteWidgetController(widget: Widget) {
    this.widgetService.deleteWidget(this.widgetId);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
