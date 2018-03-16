import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageService {

  constructor(private _http: Http) {}
  baseUrl = environment.baseUrl;

  createPage(websiteId: String, page: Page) {
    return this._http.post(this.baseUrl + '/api/website/' + websiteId + '/page', page)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageByWebsiteId(websiteId: String) {
    return this._http.get(this.baseUrl + '/api/website/' + websiteId + '/page')
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageById(pageId: String) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePage(page: Page) {
    const url = this.baseUrl + '/api/page/' + page._id;
    return this._http.put(url, page).map((response: Response) => {
      return response.json();
    });
  }

  deletePageById(pageId: String) {
    return this._http.delete(this.baseUrl + '/api/page/' + pageId)
      .map((response: Response) => {
        return response.json();
      });
  }
}
