import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-text-new',
  templateUrl: './widget-text-new.component.html',
  styleUrls: ['./widget-text-new.component.css']
})
export class WidgetTextNewComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widget: Widget;

  name: string;
  text: string;
  size: number;
  width: string;
  url: string;
  rows: number;
  placeholder: string;
  formatted: boolean;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  createWidget() {
    this.name = this.widgetForm.value.name;
    // console.log('widgetForm: ');
    // console.log(this.widgetForm);
    // console.log('widgetForm.value: ');
    // console.log(this.widgetForm.value);
    this.text = this.widgetForm.value.text;
    this.rows = this.widgetForm.value.rows;
    this.formatted = (this.widgetForm.value.formatted !== '');
    // this.formatted = this.widgetForm.value.formatted;

    this.placeholder = this.widgetForm.value.placeholder;
    // console.log(this.formatted);
    this.size = 1;
    this.width = '100%';
    this.url = 'url';

    this.widget = new Widget(undefined, 'TEXT', this.pageId, this.size,
      this.text, this.width, this.url, this.name, this.rows, this.placeholder, this.formatted);
    console.log(this.widget);
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
