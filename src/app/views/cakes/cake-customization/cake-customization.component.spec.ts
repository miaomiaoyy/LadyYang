import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeCustomizationComponent } from './cake-customization.component';

describe('CakeCustomizationComponent', () => {
  let component: CakeCustomizationComponent;
  let fixture: ComponentFixture<CakeCustomizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeCustomizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
