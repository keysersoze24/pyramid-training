import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrDenyButtonsComponent } from './confirm-or-deny-buttons.component';

describe('ConfirmOrDenyButtonsComponent', () => {
  let component: ConfirmOrDenyButtonsComponent;
  let fixture: ComponentFixture<ConfirmOrDenyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrDenyButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrDenyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
