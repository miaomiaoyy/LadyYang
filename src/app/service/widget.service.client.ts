import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {DomSanitizer} from '@angular/platform-browser';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class WidgetService {

  constructor(private _http: Http) {}
  baseUrl = environment.baseUrl;

  createWidget(pageId: string, widget: Widget) {
    return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetsByPageId(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetById(widgetId: string) {
    return this._http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWidget(widgetId: string, widget: Widget) {
    return this._http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWidget(widgetId) {
    return this._http.delete(this.baseUrl + '/api/widget/' + widgetId)
      .map((response: Response) => {
        return response.json();
      });
  }

}
