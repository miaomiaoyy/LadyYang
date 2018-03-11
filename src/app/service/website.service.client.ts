import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';


@Injectable()
export class WebsiteService {

  constructor(private _http: Http) {}
  baseUrl = environment.baseUrl;

  createWebsite(userId: string, website: Website) {
    return this._http.post(this.baseUrl + '/api/user/' + userId + '/website', website)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWebsitesByUser(userId: string) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/website')
      .map((response: Response) => {
        return response.json();
      });
  }

  findWebsiteById(websiteId: string) {
    return this._http.get(this.baseUrl + '/api/website/' + websiteId)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWebsite(websiteId: string, website: Website) {
    return this._http.put(this.baseUrl + '/api/website/' + websiteId, website)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWebsite(websiteId: string) {
    return this._http.delete(this.baseUrl + '/api/website/' + websiteId)
      .map((response: Response) => {
        return response.json();
      });
  }
}
