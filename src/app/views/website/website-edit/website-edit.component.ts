import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') websiteForm: NgForm;

  website: Website;
  websites: Website[] = [];
  userId: String;
  websiteId: String;

  constructor(
    private websiteService: WebsiteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updateWebsite() {
    this.website = this.websiteService.updateWebsite(this.website._id, this.website);
    console.log(this.website);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.website._id);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      alert('Revising website  ' + this.websiteId);
      this.website = this.websiteService.findWebsiteById(this.websiteId);
      this.websites = this.websiteService.findWebsitesByUser(this.userId);
      // this.website.name = this.websiteForm.value.name;
      // this.website.description = this.websiteForm.value.description;
      //     this.widget.size = this.imageForm.value.headerSize;
    });
  }


}
