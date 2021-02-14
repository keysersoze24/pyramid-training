import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStatusTitleComponent } from './app-status-title.component';

describe('AppStatusTitleComponent', () => {
  let component: AppStatusTitleComponent;
  let fixture: ComponentFixture<AppStatusTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppStatusTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStatusTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
