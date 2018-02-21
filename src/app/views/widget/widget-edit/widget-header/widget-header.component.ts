import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @ViewChild('f') headerForm: NgForm;

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  name: String;
  text: String;
  size: String;
  widgetType: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }
  header() {
    this.name = this.headerForm.value.headingName;
    this.text = this.headerForm.value.headingText;
    this.size = this.headerForm.value.headingSize;
    if (this.widget._id !== 'newHeading') {
      this.widgetService.updateWidget(this.widgetId, this.widget);
    } else {
      this.widgetService.createWidget(this.pageId, this.widgetId);
    }

    this.router.navigate(['./header']);
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


   if (this.widgetId !== undefined ) {
     this.widget =  this.widgetService.findWidgetById(this.widgetId);

   }  else {
     this.widget = new Widget('', '', '', '', '', '', '');
     this.text = this.widget.text;
     this.size = this.widget.size;
     this.widgetType = this.widget.widgetType;
   }
    // this.widgetService.findWidgetsByPageId(this.pageId);

  }
  updateWidgetController() {
    this.name = this.headerForm.value.headingName;
    this.text = this.headerForm.value.headingText;
    this.size = this.headerForm.value.headingSize;
    if (this.widget._id !== 'newHeading') {
      this.widgetService.updateWidget(this.widgetId, this.widget);
    } else {
      this.widgetService.createWidget(this.pageId, this.widgetId);
    }

    this.router.navigate(['./header']);
  }
  deleteWidgetController() {
    this.widgetService.deleteWidget(this.widgetId);
  }
}
