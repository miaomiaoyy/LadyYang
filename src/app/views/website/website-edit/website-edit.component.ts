import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  websiteId: String;
  websites: Website[] = [];
  name = String;
  developerId: String;
  user: User;
  userId: String;
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.developerId = params['uid'];
        this.userId = params['uid'];
      }
    );

    this.websites = this.websiteService.findWebsitesByUser(this.developerId);
    this.websiteService.deleteWebsite(this.websiteId);
  }

}
