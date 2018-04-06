import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
// import {environment} from '../../environments/environment.prod';
import {environment} from '../../environments/environment';

@Injectable()
export class WidgetService {

  constructor(private http: Http) {}

  baseUrl = environment.baseUrl;

  createWidget(pageId: String, widget: Widget) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget);
    //   .map((response: Response) => {
    //   return response.json();
    // });
  }

  findWidgetByPageId(pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findWidgetById(widgetId: String) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  updateWidget(widget) {
    const url = this.baseUrl + '/api/widget/' + widget._id;
    return this.http.put(url, widget);
    //   .map((response: Response) => {
    //   return response.json();
    // });
  }

  deleteWidget(widgetId: String) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url);
    //   .map((response: Response) => {
    //   return response.json();
    // });
  }

  reorderWidgets(startIndex, endIndex, pageId) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this.http.put(url, '');
    //   .map((response: Response) => {
    //   return response.json();
    // });
  }
}
