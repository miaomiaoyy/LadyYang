import {Routes, RouterModule} from '@angular/router';


import {RegisterComponent} from './views/users/register/register.component';
import {ProfileComponent} from './views/users/profile/profile.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {LoginComponent} from './views/users/login/login.component';
import { UserService } from './service/user.service.client';
import { WebsiteService } from './service/website.service.client';
import { PageService } from './service/page.service.client';
import { WidgetService } from './service/widget.service.client';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {WidgetYoutubeComponent} from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';

const appRoutes: Routes = [
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  // {path: 'profile/:userId', component: ProfileComponent},
  // {path: 'profile/:userId/website', component: WebsiteListComponent},
  // {path: 'profile/:userId/website/new', component: WebsiteNewComponent},
  // {path: 'profile/:userId/website/:pid', component: WebsiteEditComponent},
  // {path: 'profile/:userId/website/:pid/widget', component: WidgetListComponent},
  // {path: 'profile/:userId/website/:pid/widget/new', component: WidgetChooserComponent},
  // {path: 'profile/:userId/website/:pid/widget/.wgid', component: WidgetEditComponent}


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
  {path: '', redirectTo: '/login', pathMatch: 'full'},

];

export const routing = RouterModule.forRoot(appRoutes);
