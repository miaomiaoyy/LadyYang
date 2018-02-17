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

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'profile/:userId/website', component: WebsiteListComponent},
  {path: 'profile/:userId/website/new', component: WebsiteNewComponent},
  {path: 'profile/:userId/website/:pid', component: WebsiteEditComponent},
  {path: 'profile/:userId/website/:pid/widget', component: WidgetListComponent},
  {path: 'profile/:userId/website/:pid/widget/new', component: WidgetChooserComponent},
  {path: 'profile/:userId/website/:pid/widget/.wgid', component: WidgetEditComponent}

];

export const routing = RouterModule.forRoot(appRoutes);
