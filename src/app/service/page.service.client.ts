import {Page} from '../model/page.model.client';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class PageService {

  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  pages: Page[] = [
    {_id: '321', name: 'Post 1', websiteId: '456', description: 'Pikachu'},
    {_id: '432', name: 'Post 2', websiteId: '456', description: 'Hello Kitty'},
    {_id: '543', name: 'Post 3', websiteId: '456', description: 'Yang'}

  ];

  dumpPage() {
    return new Page(undefined, undefined, undefined, undefined);
  }

  copyPage(page: Page) {
    if (!page) {
      return undefined;
    }
    return new Page(page._id, page.name, page.websiteId, page.description);
  }

  // createPage(websiteId: String, page: Page) {
  //   // console.log('before created = ' + this.pages.length);
  //   const createdPage = new Page(String(this.pages.length + 1), page.name, websiteId, page.description);
  //   this.pages.push(createdPage);
  //   // console.log('after created = ' + this.pages.length);
  //   return this.copyPage(createdPage);
  // }

  createPage(websiteId: String, page: Page) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // findPageByWebsiteId(websiteId: String) {
  //   const resultSet = [];
  //   for (const page of this.pages) {
  //     if (page.websiteId === websiteId) {
  //       resultSet.push(this.copyPage(page));
  //     }
  //     // console.log('resultset size= ' + resultSet.length);
  //   }
  //   return resultSet;
  // }

  findPageByWebsiteId(websiteId: String) {
    console.log('client side find page by websiteid');
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    console.log('url = ' + url);
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // findPageById(pageId: String) {
  //   const foundPage = this.pages.find(function (page) {
  //     return page._id === pageId;
  //   });
  //   return this.copyPage(foundPage);
  // }

  findPageById(pageId: String) {
    console.log('client side find page by id');
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }


  // updatePage(pageId: String, page: Page) {
  //   const foundPage = this.pages.find(function (page) {
  //     return page._id === pageId;
  //   });
  //   foundPage.name = page.name;
  //   foundPage.description = page.description;
  //   return this.copyPage(foundPage);
  // }

  // updatePage(pageId: String, page: any) {
  //   for (let x = 0; x < this.pages.length; x++) {
  //     if (this.pages[x]._id === pageId) {
  //       this.pages[x].name = page.name;
  //       this.pages[x].description = page.title;
  //     }
  //   }
  // }

  updatePage(pageId: String, page: any) {
    console.log('client side update page');
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.put(url, page).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  // deletePage(pageId: String) {
  //   for (const i in this.pages) {
  //     if (this.pages[i]._id === pageId) {
  //       const j = +i;
  //       this.pages.splice(j, 1);
  //     }
  //   }
  // }

  deletePage(pageId: String) {
    console.log('client side delete page');
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

}
