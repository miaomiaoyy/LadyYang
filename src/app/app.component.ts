import { Component } from '@angular/core';
import { ApplicationRef } from '@angular/core';

declare var window: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  hideMenu = true;

  constructor (
    private ref: ApplicationRef
  ) {
    $(window).click(function(e) {
      this.hideMenu = true;
      ///this.ref.tick();
    });
  }

  public toggleMenu(e) {
    this.hideMenu = !this.hideMenu;
    e.stopPropagation();
  }
}
