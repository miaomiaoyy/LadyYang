import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

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

  updatePage(pageId: String, page: Page) {
    return this._http.put(this.baseUrl + '/api/page/' + pageId, page)
      .map((response: Response) => {
        return response.json();
      });
  }

  deletePage(pageId: String) {
    return this._http.delete(this.baseUrl + '/api/page/' + pageId)
      .map((response: Response) => {
        return response.json();
      });
  }
}
