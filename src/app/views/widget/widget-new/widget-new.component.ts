import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-new',
  templateUrl: './widget-new.component.html',
  styleUrls: ['./widget-new.component.css']
})
export class WidgetNewComponent implements OnInit {
  userId: String;
  widgetType: String;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.widgetType = params['wgtype'];
    });
  }

}
