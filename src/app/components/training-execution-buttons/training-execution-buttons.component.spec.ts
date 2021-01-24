import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExecutionButtonsComponent } from './training-execution-buttons.component';

describe('TrainingExecutionButtonsComponent', () => {
  let component: TrainingExecutionButtonsComponent;
  let fixture: ComponentFixture<TrainingExecutionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingExecutionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingExecutionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
