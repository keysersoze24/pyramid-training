import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutExecutionComponent } from './workout-execution.component';

describe('WorkoutExecutionComponent', () => {
  let component: WorkoutExecutionComponent;
  let fixture: ComponentFixture<WorkoutExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
