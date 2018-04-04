import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-header-new',
  templateUrl: './widget-header-new.component.html',
  styleUrls: ['./widget-header-new.component.css']
})
export class WidgetHeaderNewComponent implements OnInit {
  @ViewChild('f') widgetForm: NgForm;
  pageId: String;

  text: string;
  size: number;

  widget: Widget;
  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  createWidget() {
    this.text = this.widgetForm.value.text;
    this.size = this.widgetForm.value.size;

    // const widget: Widget = new Widget(new Date().getTime() + '', 'HEADING', this.pageId, this.size, this.text);
    this.widget = new Widget(undefined, 'HEADING', this.pageId, this.size, this.text);
    console.log(this.widget);
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
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
