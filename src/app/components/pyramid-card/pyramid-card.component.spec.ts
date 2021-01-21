import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramidCardComponent } from './pyramid-card.component';

describe('PyramidCardComponent', () => {
  let component: PyramidCardComponent;
  let fixture: ComponentFixture<PyramidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramidCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
