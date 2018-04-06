import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-html-new',
  templateUrl: './widget-html-new.component.html',
  styleUrls: ['./widget-html-new.component.css']
})
export class WidgetHtmlNewComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widget: Widget;

  name: string;
  text: string;
  size: number;
  width: string;
  url: string;
  rows: number;
  placeHolder: string;
  formatted: boolean;
  middle: string;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  onContentChanged({quill, html, text}) {
    this.middle = html;
  }

  createWidget() {
    this.name = this.widgetForm.value.name;
    this.text = this.widgetForm.value.text;

    this.size = 1;
    this.width = '100%';
    this.url = 'url';
    this.rows = 1;
    this.placeHolder = 'placeholder';
    this.formatted = false;

    this.widget = new Widget(undefined, 'HTML', this.pageId, this.size,
this.text, this.width, this.url, this.name, this.rows, this.placeHolder, this.formatted);
    this.widget.text = this.middle;
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
