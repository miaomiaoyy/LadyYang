import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;
  userId: String;
  websiteId: String;
  name: String;
  description: String;

  page: Page;

  constructor(private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private router: Router) { }

  createPage() {
    this.name = this.pageForm.value.name;
    this.description = this.pageForm.value.description;

    this.page = new Page(undefined, this.name, this.websiteId, this.description);
    this.pageService.createPage(this.websiteId, this.page).subscribe(
      (data: any) => {
        this.page = data;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
  }

}
