import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Training } from 'src/app/models/training';
import { PyramidCardComponent } from '../pyramid-card/pyramid-card.component';
import { TrainingCardFormValidator } from './training-card-form-validator';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit {
  training = new Training();

  formGroup: FormGroup;
  formValidator: TrainingCardFormValidator;

  constructor(public dialog: MatDialog, private overlay: Overlay, private fb: FormBuilder) {
    this.formValidator = new TrainingCardFormValidator(this.fb, this.training);
    this.formGroup = this.formValidator.formGroup;
  }

  ngOnInit(): void {
  }

  openPyramidDialog() {
    const dialogRef = this.dialog.open(PyramidCardComponent, {
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: this.training.workout.doublePyramids[0]
    })
  }

  saveTraining() {  }




  onValueSelected(valueSelected: boolean) {
    if (valueSelected) {

    }
    else {

    }
  }
}
