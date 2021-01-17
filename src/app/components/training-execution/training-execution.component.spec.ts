import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExecutionComponent } from './training-execution.component';

describe('TrainingExecutionComponent', () => {
  let component: TrainingExecutionComponent;
  let fixture: ComponentFixture<TrainingExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
