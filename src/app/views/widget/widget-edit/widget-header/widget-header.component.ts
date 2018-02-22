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
  pageId: String;
  widgetId: String;
  websiteId: String;
  widget: Widget;
  widgets: Widget[] = [];
  text: String;
  size: String;
  widgetType: String;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  delete() {
    if (this.widgetId !== 'header') {
      this.widgetService.deleteWidget(this.widgetId);
      alert('delete success');
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  updateWidgetController() {
    if (this.headerForm.value.headerText !== '' || this.headerForm.value.headerSize !== '') {
      this.widget.text = this.headerForm.value.headerText;
      this.widget.size = this.headerForm.value.headerSize;
      alert(this.widget.text);
      alert(this.widget.size);
    }
    if (this.widgetId === 'header') {
        this.widgetService.createWidget(this.pageId, this.widget);
        alert(this.widgetId);
        alert(this.widgets.length);
        alert('Creation succeeds');
    } else {
        this.widgetService.updateWidget(this.widget._id, this.widget);
        alert(this.widgetId);
        alert('Change succeeds');
      }
    const url: any = '/user/' + this.userId + '/website' + this.websiteId + '/page/' + this.pageId + '/widget';
    this.router.navigate([url]);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['pid'];
      this.userId = params['uid'];
      this.widgetId = params['wgid'];
      this.websiteId = params['wid'];
      if (params['wgid'] !== 'header') {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
      } else {
        this.widget = new Widget('', '', this.pageId, '', '', '', '');
      }
      this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
      this.text = this.widget.text;
      this.size = this.widget.size;
      this.widgetType = this.widget.widgetType;
    });
  }
}

