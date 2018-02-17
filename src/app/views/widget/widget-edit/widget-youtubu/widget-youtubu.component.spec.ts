import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetYoutubuComponent } from './widget-youtubu.component';

describe('WidgetYoutubuComponent', () => {
  let component: WidgetYoutubuComponent;
  let fixture: ComponentFixture<WidgetYoutubuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetYoutubuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetYoutubuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
