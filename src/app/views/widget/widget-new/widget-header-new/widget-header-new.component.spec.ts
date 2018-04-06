import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHeaderNewComponent } from './widget-header-new.component';

describe('WidgetHeaderNewComponent', () => {
  let component: WidgetHeaderNewComponent;
  let fixture: ComponentFixture<WidgetHeaderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHeaderNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHeaderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
