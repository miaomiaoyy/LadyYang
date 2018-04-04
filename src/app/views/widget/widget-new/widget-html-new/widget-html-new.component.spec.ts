import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHtmlNewComponent } from './widget-html-new.component';

describe('WidgetHtmlNewComponent', () => {
  let component: WidgetHtmlNewComponent;
  let fixture: ComponentFixture<WidgetHtmlNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHtmlNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHtmlNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
