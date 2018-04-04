import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  pageId: String;
  widgets: Widget[] = [];
  userId: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  getUrl(url: String) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  }

  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        (data) => console.log(data)
      );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.pageId = params['pid'];
        this.userId = params['uid'];
      }
    );

    this.widgetService.findWidgetByPageId(this.pageId).subscribe(
      (widgets: Widget[]) => {
        this.widgets = widgets;
        console.log(this.widgets);
      }
    );
  }

}
