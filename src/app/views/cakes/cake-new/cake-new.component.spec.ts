import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeNewComponent } from './cake-new.component';

describe('CakeNewComponent', () => {
  let component: CakeNewComponent;
  let fixture: ComponentFixture<CakeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
