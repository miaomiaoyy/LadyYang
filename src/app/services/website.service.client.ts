import {Website} from '../models/website.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
// import {environment} from '../../environments/environment.prod';
import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {

  constructor(private http: Http) {}

  baseUrl = environment.baseUrl;


  createWebsite(userId: String, website: Website) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteByUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  updateWebsite(website: Website) {
    const url = this.baseUrl + '/api/website/' + website._id;
    return this.http.put(url, website).map((response: Response) => {
      return response.json();
    });
  }

  deleteWebsite(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url);
    // return this.http.delete(url).map((response: Response) => {
    //   return response.json();
    // });
  }
}
