import {Website} from '../model/website.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';


@Injectable()
export class WebsiteService {

  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  websites: Website[] = [
    {_id: '123', name: 'Facebook', developerId: '456', description: 'Lorem'},
    {_id: '234', name: 'Tweeter', developerId: '456', description: 'Lorem'},
    {_id: '456', name: 'Gizmodo', developerId: '456', description: 'Lorem'},
    {_id: '890', name: 'Go', developerId: '123', description: 'Lorem'},
    {_id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem'},
    {_id: '678', name: 'Checkers', developerId: '123', description: 'Lorem'},
    {_id: '789', name: 'Chess', developerId: '234', description: 'Lorem'}
  ];

  // createWebsite(userId: String, website: Website) {
  //
  //   const new_website = {
  //     _id: (new Date()).getTime() + '',
  //     name: website.name,
  //     developId: website.developerId,
  //     description: website.description
  //   };
  //
  //   this.websites.push(new_website);
  // }

  // createWebsite(userId: String, website: any) {
  //   website._id = Math.random().toString();
  //   website.developerId = userId;
  //   this.websites.push(website);
  // }

  createWebsite(userId: String, website: any) {
    console.log('client side create website');
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    console.log('create website url = ' + url);
    return this.http.post(url, website).map(
      (res: Response) => {
        return res.json();
      }
    );
  }


  // findWebsitesByUser(userId: String) {
  //   const resultSet = [];
  //   for (const i in this.websites) {
  //     if (this.websites[i].developerId === userId) {
  //       resultSet.push(this.websites[i]);
  //     }
  //   }
  //   return resultSet;
  // }

  // wode
  // findWebsitesByUser(userId: String) {
  //   console.log('client side find website by user');
  //   const url = this.baseUrl + '/api/user/' + userId + '/website';
  //   return this.http.get(url).map(
  //     (res: Response) => {
  //       return res.json();
  //     }
  //   );
  // }
  findWebsitesByUser(userId: String) {
    console.log('client side find website by user');
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    console.log('url= ' + url);
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // findWebsitesByUser2(userId: String) {
  //   return this.websites.filter(function (website) {
  //     return website.developerId === userId;
  //   });
  // }

  // findWebsitesById(websiteId: String) {
  //   return this.websites.find(function (website) {
  //     return website._id === websiteId;
  //   });
  // }

  // app.get("/api/website/:websiteId", findWebsiteById);
  findWebsitesById(websiteId: String) {
    console.log('client side find website by ID');
    const url = this.baseUrl + '/api/website/' + websiteId;
    console.log('findwebsitebyId url = ' + url);
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // updateWebsite(websiteId: String, website: Website) {
  //   for (const i in this.websites) {
  //     if (this.websites[i]._id === websiteId) {
  //       this.websites[i].name = website.name;
  //       this.websites[i].description = website.description;
  //     }
  //   }
  // }

  // /api/website/:websiteId
  updateWebsite(websiteId: String, website: Website) {
    console.log('client side update website by website id');
    const url = this.baseUrl + '/api/website/' + websiteId;
    console.log('update website url= ' + url);
    return this.http.put(url, website).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // /api/website/:websiteId
  deleteWebsite(websiteId: String) {
    console.log('client side delelte website');
    const url = '/api/website/' + websiteId;
    console.log('delete website url = ' + url);
    return this.http.delete(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }
}
