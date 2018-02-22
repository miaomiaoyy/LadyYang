import {Component, Inject, OnInit} from '@angular/core';
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
      this.widgetService.createWidget(this.pageId, this.widget);
    } else {
      this.widget = this.widgetService.updateWidget(this.widget._id, this.widget);
    }
    console.log(this.widget);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = params['wgid'];
      this.pageId = params['pid'];
      this.userId = params['uid'];
      if (this.widgetId === 'youtube') {
        this.widget = new Widget('', '', this.pageId, '', '', '', '');
        this.widget.widgetType = 'YOUTUBE';
      } else {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
      }
    });
  }

}
