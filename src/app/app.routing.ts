import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {WidgetNewComponent} from './views/widget/widget-new/widget-new.component';
import {FlickrImageSearchComponent} from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:uid', component: ProfileComponent},
  {path: 'profile/:uid/website', component: WebsiteListComponent},
  {path: 'profile/:uid/website/new', component: WebsiteNewComponent},
  {path: 'profile/:uid/website/:wid', component: WebsiteEditComponent},
  {path: 'profile/:uid/website/:wid/page', component: PageListComponent},
  {path: 'profile/:uid/website/:wid/page/new', component: PageNewComponent},
  {path: 'profile/:uid/website/:wid/page/:pid', component: PageEditComponent},
  {path: 'profile/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent},
  {path: 'profile/:uid/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent},
  {path: 'profile/:uid/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent},
  {path: 'profile/:uid/website/:wid/page/:pid/widget/new/:wgtype', component: WidgetNewComponent},
  {path: 'profile/:uid/website/:wid/page/:pid/widget/:wgid/flickr', component: FlickrImageSearchComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
