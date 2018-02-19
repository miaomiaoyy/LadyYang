
import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
import {AlertService} from './alert.service.client';

@Injectable()
export  class WidgetService {

  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  widgets: Widget[] = [
    new Widget('123', 'HEADER', '321', '2', 'GIZMODO' ),
    new Widget('123', 'HEADER', '321', '2', 'GIZMODO' ),
    new Widget('123', 'IMAGE', '321', '2', 'text', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('123', 'HTML', '321', '2', '<p>blalbla</p>' ),
    new Widget('123', 'YOUTUBE', '321', '2', 'text', '100%', 'https://youtube.com/token' ),
  ];
  alertService: AlertService;
  createWidget(pageId, widget) {
    this.widgets.push(widget);
  }

  updateWidget(widgetId, widget) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType){
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }

  findWidgetsByPageId(pageId: String) {
    const res: Widget[] = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId == pageId) {
        res.push(this.widgets[x]);
      }
    }
    return res;
  }
  deleteWidget(widgetId) {
    alert(this.alertService.success('delete Successful', true));
  }
  findWidgetsByPageId2(pageId) {
    return this.widgets.find(function (widget) {
      return widget.pageId === pageId;
    });
  }

  findWidgetsById(widgetId) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }
}


