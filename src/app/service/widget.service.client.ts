
import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';


@Injectable()
export  class WidgetService {

  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  widgets: Widget[] = [
    new Widget('123', 'HEADER', '321', '2', 'C\'est la vie' ),
    new Widget('619', 'HEADER', '123', '3', 'C\'est la vie' ),
    new Widget('612', 'HEADER', '123', '22', 'Hello Kitty' ),
    new Widget('999', 'IMAGE', '123', '3',  'http://lorempixel.com/400/200/'),
    new Widget('321', 'HEADER', '321', '2', 'LOVE LIFE' ),
    new Widget('132', 'IMAGE', '321', '2', 'text', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('231', 'HTML', '222', '2', '<p>blalbla</p>' ),
    new Widget('222', 'HEADER', '222', '2', '<p>blalbla</p>' ),
    new Widget('312', 'YOUTUBE', '321', '2', 'text', '100%', 'https://www.youtube.com/watch?v=87gWaABqGYs&list=RDMM87gWaABqGYs' ),
    new Widget('435', 'YOUTUBE', '111', '2', 'text', '100%', 'https://www.youtube.com/watch?v=87gWaABqGYs&list=RDMM87gWaABqGYs' ),
    new Widget('666', 'IMAGE', '333', '3', 'http://lorempixel.com/400/200/'),
  ];
  createWidget(pageId, widget) {
    widget._id = (new Date()).getTime() + '';
    this.widgets.push(widget);
  }

  updateWidget(widgetId, widget) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return this.widgets[i];
          case 'HTML':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return this.widgets[i];
          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return this.widgets[i];
          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return this.widgets[i];
        }

      }
    }
    alert('No Update');
  }

  findWidgetsByPageId(pageId: String) {
    const res: Widget[] = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId) {
        res.push(this.widgets[x]);
      }
    }
    return res;
  }
  findWidgetsByPageIdandText(text: String, pageId: String) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId && (this.widgets[x].text === text)) {
        return this.widgets[x];
      }
    }
  }
  deleteWidget(widgetId) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
      }
    }
  }
  findWidgetsByPageId2(pageId) {
    return this.widgets.find(function (widget) {
      return widget.pageId === pageId;
    });
  }

  findWidgetById(widgetId) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }


}



// import {Injectable} from '@angular/core';
// import {Widget} from '../models/widget.model.client';
// import 'rxjs/Rx';
//
// import {Http, Response} from '@angular/http';
//
// @Injectable()
// export class WidgetService {
//
//   constructor(private http: Http){}
//
//   findAllWidgets(){
//     return this.http.get('http://localhost:3100/api/widget').map((response: Response) => {
//       return response.json();
//     })
//   }
// }
