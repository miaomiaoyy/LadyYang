// import { Website } from '../models/website.model.client';
// import {Injectable} from '@angular/core';
//
//
// @Injectable()
// export class WebsiteService {
//
//   websites: Website[] = [
//     new Website('321', 'Facebook', '123', 'test' ),
//     new Website('111', 'Facebook1', '123', 'test' ),
//     new Website('222', 'Facebook2', '123', 'test' ),
//     new Website('333', 'Facebook3', '123', 'test' ),
//     new Website('432', 'Twitter', '456', 'test' ),
//     new Website('234', 'Amazon', '789', 'test' ),
//     new Website('123', 'Heruko', '123', 'helloKitty'),
//     new Website('666', 'HeloKitty', '666', 'helloKitty'),
//     new Website('234', 'HeloKitty', '234', 'helloKitty')
//   ];
//   createWebsite(userId: String, website: Website) {
//
//    // this.website {
//    //    _id: (new Date()).getTime() + '',
//    //    name: website.name,
//    //    developId: website.developId,
//    //    description: website.description
//    //  };
//
//     this.websites.push(website);
//   }
//
//   findWebsitesByUser(userId: String) {
//     const resultSet = [];
//     for ( const i in this.websites) {
//       if (this.websites[i].developId === userId) {
//         resultSet.push(this.websites[i]);
//       }
//     }
//     return resultSet;
//   }
//
//   findWebsitesByUser2(userId: String) {
//     return this.websites.filter(function (website) {
//       return website.developId === userId;
//     });
//   }
//
//   findWebsiteById(websiteId: String) {
//     return this.websites.find(function (website) {
//       return website._id === websiteId;
//     });
//   }
//
//   updateWebsite(websiteId: String, website: Website) {
//     for (const i in this.websites) {
//       if (this.websites[i]._id === websiteId) {
//         this.websites[i].name = website.name;
//         this.websites[i].description = website.description;
//         return this.websites[i];
//       }
//     }
//   }
//
//   deleteWebsite(websiteId: String) {
//     for (const i in this.websites) {
//       if (this.websites[i]._id === websiteId) {
//         const j = +i;
//         this.websites.splice(j, 1);
//       }
//     }
//   }
// }

import {Injectable} from '@angular/core';
import {Website} from '../models/website.model.client';
import {WEBSITES} from './website.mock';
import {Http, Response} from '@angular/http';
import "rxjs/Rx";

@Injectable()
export class WebsiteServiceClient {
  websites: Website[] = WEBSITES;
  findAllWebSites() {
    return this.websites;
  }

  updateWebsite(userId: String, newWebsite: Website){
    const url =  'http://localhost:3100/api/user/' + userId + '/website/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(userId: String, websiteId: String){
    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteWebsite(userId: String,  websiteId: String){
    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createWebsiteForUser(userId: String, website: Website){
    const url = 'http://localhost:3100/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    })
  }


  findWebsiteForUser(userId: String){
    const url =  'http://localhost:3100/api/user/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  constructor(private http: Http){}
}
