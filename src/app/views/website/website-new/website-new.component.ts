import {Component, OnInit} from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../model/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  // websiteId: String;
  websites: Website[] = [];
  // _id: String;
  // name: String;
  // developId: String;
  // description: String;
  newWebsite: Website = {_id: '', name: '', developerId: '', description: ''};

  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        // this.userId = params['uid'];
        this.userId = params.uid;
        // this.websiteId = params['wid'];
        return this.websiteService.findWebsitesByUser(this.userId).subscribe(
          (websites: Website[]) => {
            this.websites = websites;
          }
        );
      }
    );
    // this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  createNewWebsite(website) {
    console.log('hello create new website');
    console.log('website new----- new website name= ' + website.name);
    console.log('website new----- new website description =' + website.description);
    // website.developerId = this.userId;
    if (website.name.trim() !== '' && website.description.trim() !== '') {
      this.websiteService.createWebsite(this.userId, website).subscribe(
        (website: Website) => {
          const url: any = '/user/' + this.userId + '/website';
          this.router.navigate([url]);
        },
        (error: any) => {
        }
      );
    }
    // this.websiteService.createWebsite(this.userId, newWebsite);
    // const url: String = '/user/' + this.userId + '/website';
    // console.log('new website -------- url = ' + url);
    // this.router.navigate([url]);
    // console.log('size= ' + this.websites.length);
  }
}

