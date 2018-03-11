import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  widgets: Widget[];
  userId: String;
  websiteId: String;
  pageId: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
      }
    );
    this.activatedRoute.params.subscribe(params => {
      this.widgetService.findWidgetsByPageId(params['pid']).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
        },
        (error: any) => console.log(error)
      );
    });
  }

    // createWidgetController(wgtype: String) {
    //   const new_widget = {
    //     _id: '',
    //     type: wgtype,
    //     pageId: this.pageId,
    //     size: '2',
    //     websiteId: this.websiteId,
    //     url : ''
    //   };
    //   new_widget.url = '/profile/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + new_widget._id;
    //   this.widgetService.createWidget(this.pageId, new_widget);
    //   this.router.navigate([new_widget.url]);
    // }
  }

