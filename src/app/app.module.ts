import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {routing} from './app.routing';
import {QuillEditorModule} from 'ngx-quill-editor';

import {AppComponent} from './app.component';
import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';

import {UserService} from './service/user.service.client';
import {FormsModule} from '@angular/forms';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {HttpModule} from '@angular/http';
import {WebsiteService} from './service/website.service.client';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {PageService} from './service/page.service.client';
import {WidgetService} from './service/widget.service.client';
import {WidgetHeaderComponent} from './views/widget/widget-edit/widget-header/widget-header.component';
import {WidgetImageComponent} from './views/widget/widget-edit/widget-image/widget-image.component';
import {WidgetYoutubeComponent} from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import {WidgetHtmlComponent} from './views/widget/widget-edit/widget-html/widget-html.component';
import {WidgetTextComponent} from './views/widget/widget-edit/widget-text/widget-text.component';
import {SortableDirective} from '../../assignment/directives/sortable.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    PageListComponent,
    PageEditComponent,
    PageNewComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    SortableDirective,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetHtmlComponent,
    WidgetTextComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    QuillEditorModule
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
