import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetYoutubeNewComponent } from './widget-youtube-new.component';

describe('WidgetYoutubeNewComponent', () => {
  let component: WidgetYoutubeNewComponent;
  let fixture: ComponentFixture<WidgetYoutubeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetYoutubeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetYoutubeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
