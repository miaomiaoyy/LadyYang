
import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';
import {AlertService} from './alert.service.client';



@Injectable()
export class PageService {

  pages: Page[] = [
    new Page('321', 'page321', '321', 'test page 321'),
    new Page('111', 'page111', '111', 'test page 111' ),
    new Page('222', 'page222', '222', 'test page 222' ),
    new Page('333', 'page333', '333', 'test page 333' ),
    new Page('432', 'page432', '432', 'test page 432' ),
    new Page('234', 'page234', '234', 'test page 234' ),
    new Page('333', 'page666', '666', 'test page 666' ),
  ];
  alertService: AlertService;

  createPage(websiteId: String, page: Page) {

    const new_page = {
      _id: (new Date()).getTime() + '',
      name: page.name,
      websiteId: page.websiteId,
      title: page.title
    };

    this.pages.push(new_page);
  }

  findPageByWebsiteId(websiteId: String) {
    const resultSet = [];
    for ( const i in this.pages) {
      if (this.pages[i].websiteId === websiteId) {
        resultSet.push(this.pages[i]);
      }
    }
    return resultSet;
  }

  findPageByWebsiteId2(websiteId: String) {
    return this.pages.filter(function (page) {
      return page.websiteId === websiteId;
    });
  }

  findPageById(pageId: String) {
    return this.pages.find(function (page) {
      return page._id === pageId;
    });
  }

  updatePage(pageId: String, pageName: String, pageTitle: String) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        this.pages[i].name = pageName;
        this.pages[i].title = pageTitle;
      }
    }
  }

  deletePageById(pageId: String) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        const j = +i;
        this.pages.splice(j, 1);
        alert(this.alertService.success('delete Successful', true));
      }
    }
  }
}
