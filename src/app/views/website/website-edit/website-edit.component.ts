import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../model/website.model.client';
import {WebsiteService} from '../../../service/website.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  // website: Website;
  updatedWebsite: Website = {_id: '', name: '', developerId: '', description: ''};
  websites: Website[] = [];
  websiteId: String;
  developerId: String;

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.websiteId = params['wid'];
        this.developerId = params['uid'];
        this.websiteService.findWebsitesByUser(this.developerId).subscribe(
          (websites: Website[]) => {
            this.websites = websites;
          },
          (error: any) => {
          }
        );
        this.websiteService.findWebsitesById(this.websiteId).subscribe(
          (website: Website) => {
            this.updatedWebsite = website;
          },
          (error: any) => {
          }
        );
      }
    );
    // this.updatedWebsite = this.websiteService.findWebsitesById(this.websiteId);


    // console.log('test-----' + this.updatedWebsite.name);
  }

  // stop here (update website)
  updateWebsite(website) {
    console.log('hello updateeeeeeeeee');
    console.log('website edit----- dev id = ' + this.developerId);
    console.log('website edit----- updatedWebsite name = ' + website.name);
    console.log('website edit----- updatedWebsite description = ' + website.description);

    if (website.name.trim() !== '' && website.description.trim() !== '') {
      // website.developerId = this.developerId;
      this.websiteService.updateWebsite(website._id, website).subscribe(
        (website: Website) => {
          const url: String = '/user/' + this.developerId + '/website';
          this.router.navigate([url]);
        },
        (error: any) => {
        }
      );
      // const url: any = '/user/' + this.developerId + '/website';
      // this.router.navigate([url]);
      // console.log('website edit url= ' + url);
    }
  }

  deleteWebsite() {
    console.log('hello, here is the delete funcion in website-edit.component');
    this.websiteService.deleteWebsite(this.websiteId).subscribe(
      (website: Website) => {
        const url: String = '/user/' + this.developerId + '/website';
        this.router.navigate([url]);
      },
      (error: any) => {}
    );
    // const url: String = '/user/' + this.developerId + '/website';
    // this.router.navigate([url]);
  }
}
