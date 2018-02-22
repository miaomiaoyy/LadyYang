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
  wgid: String;
  websiteId: String;
  widget: Widget;
  widgets: Widget[] = [];
  text: String;
  size: String;
  widgetType: String;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  delete() {
    if (this.wgid !== 'header') {
      this.widgetService.deleteWidget(this.wgid);
      alert('delete success');
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  update() {
    if (this.headerForm.value.headerText !== '' || this.headerForm.value.headerSize !== '') {
      this.widget.text = this.headerForm.value.headerText;
      this.widget.size = this.headerForm.value.headerSize;
      alert(this.widget.text);
      alert(this.widget.size);
    }
    if (this.wgid === 'header') {
        this.widgetService.createWidget(this.pageId, this.widget);
        alert(this.wgid);
        alert(this.widgets.length);
        alert('Creation succeeds');
    } else {
        this.widgetService.updateWidget(this.widget._id, this.widget);
        alert(this.wgid);
        alert('Change succeeds');
      }
    const url: any = '/user/' + this.userId + '/website' + this.websiteId + '/page/' + this.pageId + '/widget';
    this.router.navigate([url]);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
  //   this.widget.widgetType = 'HEADER';
  //   if (this.wgid !== undefined) {
  //     this.widgetService.updateWidget(this.wgid, this.widget);
  //     this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  //   } else {
  //     this.widgetService.createWidget(this.pageId, this.widget);
  //     this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  //   }
  // }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['pid'];
      this.userId = params['uid'];
      this.wgid = params['wgid'];
      this.websiteId = params['wid'];
      if (params['wgid'] !== 'header') {
        this.widget = this.widgetService.findWidgetById(this.wgid);
      } else {
        this.widget = new Widget('', '', '', '', '', '', '');
      }
      this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
      this.text = this.widget.text;
      this.size = this.widget.size;
      this.widgetType = this.widget.widgetType;
    });
  }
}
//
// export class WidgetHeaderComponent implements OnInit {
//   @ViewChild('f') headerForm: NgForm;
//
//   userId: String;
//   websiteId: String;
//   pageId: String;
//   widgetId: String;
//   widget: Widget;
//   name: String;
//   text: String;
//   size: String;
//   widgetType: String;
//
//
//   constructor(private widgetService: WidgetService,
//               private activatedRoute: ActivatedRoute,
//               private router: Router) {
//   }
//   header() {
//     this.name = this.headerForm.value.headingName;
//     this.text = this.headerForm.value.headingText;
//     this.size = this.headerForm.value.headingSize;
//     if (this.widget._id !== undefined) {
//       this.widgetService.updateWidget(this.widget._id, this.widget);
//     } else {
//       this.widgetService.createWidget(this.pageId, this.widgetId);
//     }
//
//     this.router.navigate(['./header']);
//   }
//   update() {
//     console.log('update');
//     // this.name = this.headerForm.value.headingName;
//     this.text = this.headerForm.value.headingText;
//     this.size = this.headerForm.value.headingSize;
//     if (this.widget._id !== undefined) {
//       this.widget.text = this.text;
//       this.widget.size = this.size;
//       this.widgetService.updateWidget(this.widget._id, this.widget);
//     } else {
//       this.widget = new Widget('', '', '', '', '', '', '');
//       this.widget.text = this.text;
//       this.widget.size = this.size;
//       this.widgetService.createWidget(this.pageId, this.widgetId);
//     }
//
//     this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
//   }
//
//   ngOnInit() {
//     this.activatedRoute.params.subscribe(
//       (params: any) => {
//         this.widgetId = params['wgid'];
//         this.pageId = params['pid'];
//         this.userId = params['uid'];
//         this.websiteId = params['wid'];
//       }
//     );
//
//
//    if (this.widgetId !== undefined ) {
//      this.widget =  this.widgetService.findWidgetById(this.widgetId);
//
//    }  else {
//      this.widget = new Widget('', '', '', '', '', '', '');
//      this.text = this.widget.text;
//      this.size = this.widget.size;
//      this.widgetType = this.widget.widgetType;
//    }
//     // this.widgetService.findWidgetsByPageId(this.pageId);
//
//   }
//   updateWidgetController() {
//     this.name = this.headerForm.value.headingName;
//     this.text = this.headerForm.value.headingText;
//     this.size = this.headerForm.value.headingSize;
//     if (this.widget._id !== 'newHeading') {
//       this.widgetService.updateWidget(this.widgetId, this.widget);
//     } else {
//       this.widgetService.createWidget(this.pageId, this.widgetId);
//     }
//
//     this.router.navigate(['./header']);
//     console.log(this.widget);
//   }
//   deleteWidgetController() {
//     this.widgetService.deleteWidget(this.widgetId);
//   }
// }
