import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/users/login/login.component';
import { ProfileComponent } from './views/users/profile/profile.component';
import { RegisterComponent } from './views/users/register/register.component';

import { routing } from './app.routing';
import { WebsiteListComponent} from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { UserService } from './service/user.service.client';
import { WebsiteService } from './service/website.service.client';
import { PageService } from './service/page.service.client';
import { WidgetService } from './service/widget.service.client';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { AlertService } from './service/alert.service.client';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WidgetChooserComponent,
    WidgetListComponent,
    WidgetEditComponent,
    WidgetImageComponent,
    WidgetHeaderComponent,
    WidgetYoutubeComponent,
    PageListComponent,
    PageNewComponent,
    PageEditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    //HttpModule,
    //Routing,
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService, AlertService],
  bootstrap: [AppComponent]

})
export class AppModule { }
