import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-youtube-new',
  templateUrl: './widget-youtube-new.component.html',
  styleUrls: ['./widget-youtube-new.component.css']
})
export class WidgetYoutubeNewComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widget: Widget;

  text: string;
  size: number;
  url: string;
  width: string;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  createWidget() {
    this.text = this.widgetForm.value.text;
    this.size = this.widgetForm.value.size;
    this.url = this.widgetForm.value.url;
    this.width = this.widgetForm.value.width;

    this.widget = new Widget(undefined, 'YOUTUBE', this.pageId, this.size, this.text, this.width, this.url);
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      () => {
        // this.widget = data;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      }
    );
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
    });
  }

}
