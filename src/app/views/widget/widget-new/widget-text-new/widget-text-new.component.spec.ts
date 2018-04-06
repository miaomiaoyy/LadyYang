import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTextNewComponent } from './widget-text-new.component';

describe('WidgetTextNewComponent', () => {
  let component: WidgetTextNewComponent;
  let fixture: ComponentFixture<WidgetTextNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTextNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTextNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
