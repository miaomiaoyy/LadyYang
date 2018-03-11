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
      this.widgetService.deleteWidget(this.widgetId).subscribe(
        () => {
          alert('delete success');
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    } else {
      this.widgetService.deleteWidget(this.widgetId).subscribe(
        () => {
          alert('delete success');
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    }
  }
  //
  // updateWidgetController() {
  //   if (this.headerForm.value.headerText !== '' || this.headerForm.value.headerSize !== '') {
  //     this.widget.text = this.headerForm.value.headerText;
  //     this.widget.size = this.headerForm.value.headerSize;
  //     alert('Updating widget + ' + this.widget.text);
  //     alert(this.widget.size);
  //   }
  //   if (this.widgetId === 'header') {
  //       this.widgetService.createWidget(this.pageId, this.widget);
  //       alert(this.widgetId);
  //       alert(this.widgets.length);
  //       alert('Creation succeeds');
  //   } else {
  //       this.widgetService.updateWidget(this.widget._id, this.widget);
  //       alert(this.widgetId);
  //       alert('Change succeeds');
  //     }
  //   const url: any = '/user/' + this.userId + '/website' + this.websiteId + '/page/' + this.pageId + '/widget';
  //   this.router.navigate([url]);
  //   this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  // }

  ngOnInit() {
    this.text = this.headerForm.value.headerText;
    this.size = this.headerForm.value.headerSize;

    this.activatedRoute.params.subscribe(params => {
        this.pageId = params['pid'];
        this.userId = params['uid'];
        this.widgetId = params['wgid'];
        this.websiteId = params['wid'];
        if (params['wgid'] !== 'header') {
          this.widgetService.findWidgetById(params['wgid']).subscribe(
            (widget: Widget) => {
              this.widget = widget;
            },
            (error: any) => console.log(error)
          );
        } else {
          this.widget = new Widget('', 'HEADER', this.pageId, '', '', '100%', 'url');
          this.widget.text = this.headerForm.value.headerText;
          this.widget.size = this.headerForm.value.headerSize;
          this.widgetService.createWidget(params['pid'], this.widget).subscribe(
            (widget: Widget) => {
              this.widget = widget;
            },
            (error: any) => console.log(error)
          );
        }
      }
    );
  }

  updateWidget() {
    if (this.widgetId === 'header') {
      this.widgetService.createWidget('header', this.widget).subscribe(
        (widget: Widget) => {
          this.widget = widget;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
      alert('Creation succeeds');
    } else {
      this.widgetService.updateWidget(this.widgetId.toString(), this.widget).subscribe(
        (widget: Widget) => {
          this.widget = widget;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => console.log(error)
      );
    }
  }

    // deleteWidget() {
    //   this.widgetService.deleteWidget(this.widgetId).subscribe(
    //     () => {
    //       this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    //     },
    //     (error: any) => console.log(error)
    //   );
    // }
  }



