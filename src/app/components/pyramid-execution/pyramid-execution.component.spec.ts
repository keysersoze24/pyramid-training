import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramidExecutionComponent } from './pyramid-execution.component';

describe('PyramidExecutionComponent', () => {
  let component: PyramidExecutionComponent;
  let fixture: ComponentFixture<PyramidExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramidExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
