import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../service/website.service.client';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('w') webForm: NgForm;
  developerId: string;
  websiteName: string;
  websiteDescription: string;
  websites: Website[];

  constructor(private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.developerId = params['uid'];
      this.websiteService.findWebsitesByUser(this.developerId).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        },
        (error: any) => console.log(error)
      );
    });
  }

  createWebsite() {
    this.websiteName = this.webForm.value.websiteName;
    this.websiteDescription = this.webForm.value.websiteDescription;
    const website = new Website('', this.websiteName, this.developerId, this.websiteDescription);
    this.websiteService.createWebsite(this.developerId, website).subscribe(
      (data: any) => {
        this.router.navigate(['/profile', this.developerId, 'website']);
      },
      (error: any) => console.log(error)
    );
  }
}

//   createWebsite() {
//     const new_website = new Website(undefined, this.webForm.value.webname, this.developerId, this.webForm.value.description);
//     this.websiteService.createWebsite(this.developerId, new_website).subscribe(
//       (website: Website) => {
//         console.log(website);
//         this.router.navigate(['/..', this.developerId, 'website']);
//       }
//     );
//   }
// }
