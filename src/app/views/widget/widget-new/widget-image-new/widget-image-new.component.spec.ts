import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetImageNewComponent } from './widget-image-new.component';

describe('WidgetImageNewComponent', () => {
  let component: WidgetImageNewComponent;
  let fixture: ComponentFixture<WidgetImageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetImageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetImageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
