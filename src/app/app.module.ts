import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';

import {UserService} from './services/user.service.client';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import {PageService} from './services/page.service.client';
import {WebsiteService} from './services/website.service.client';
import {WidgetService} from './services/widget.service.client';
import { WidgetNewComponent } from './views/widget/widget-new/widget-new.component';
import { WidgetHeaderNewComponent } from './views/widget/widget-new/widget-header-new/widget-header-new.component';
import { WidgetYoutubeNewComponent } from './views/widget/widget-new/widget-youtube-new/widget-youtube-new.component';
import { WidgetImageNewComponent } from './views/widget/widget-new/widget-image-new/widget-image-new.component';
import { SortableDirective } from '../../assignment/directives/sortable.directive';
import { WidgetHtmlNewComponent } from './views/widget/widget-new/widget-html-new/widget-html-new.component';
import { WidgetTextNewComponent } from './views/widget/widget-new/widget-text-new/widget-text-new.component';
import {QuillEditorModule} from 'ngx-quill-editor/quillEditor.module';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';
import { FlickrImageSearchComponent } from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {FlickrService} from './services/flickr.service.client';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetNewComponent,
    WidgetHeaderNewComponent,
    WidgetYoutubeNewComponent,
    WidgetImageNewComponent,
    SortableDirective,
    WidgetHtmlNewComponent,
    WidgetTextNewComponent,
    WidgetHtmlComponent,
    WidgetTextComponent,
    FlickrImageSearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    HttpClientModule,
    QuillEditorModule
  ],
  providers: [UserService, PageService, WebsiteService, WidgetService, FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
