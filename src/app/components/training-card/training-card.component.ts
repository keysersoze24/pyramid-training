import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostWorkout } from 'src/app/models/post-workout';
import { PreWorkout } from 'src/app/models/pre-workout';
import { RestTime } from 'src/app/models/rest-time';
import { Training } from 'src/app/models/training';
import { Workout } from 'src/app/models/workout';
import { TrainingService } from 'src/app/services/training.service';
import { RoutesPathEnum } from 'src/app/shared/constants';
import { PyramidCardComponent } from '../pyramid-card/pyramid-card.component';
import { TrainingCardFormValidator } from './training-card-form-validator';
import * as lodash from 'lodash';
import { Pyramid } from 'src/app/models/pyramid';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss'],
})
export class TrainingCardComponent implements OnInit {
  training: Training;

  formGroup: FormGroup;
  formValidator: TrainingCardFormValidator;

  constructor(
    public dialog: MatDialog,
    private overlay: Overlay,
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private router: Router
  ) {
    const trainingToEdit: Training = this.router.getCurrentNavigation()?.extras?.state?.training;
    if (trainingToEdit?.id) {
      this.training = trainingToEdit;
    }
    else {
      this.training = new Training();
    }
    this.formValidator = new TrainingCardFormValidator(this.fb, this.training);
    this.formGroup = this.formValidator.formGroup;
  }

  ngOnInit(): void {}

  openPyramidDialog() {
    const dialogRef = this.dialog.open(PyramidCardComponent, {
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: this.training.workout.pyramids[0],
      width: '100vw',
    });
    dialogRef.afterClosed().subscribe((result: Pyramid) => {
      if (result?.basePyramid && result?.apexPyramid) {
        this.training.workout.pyramids = [result];
      }
    });
  }

  saveTraining() {
    const firstPyramid = this.training?.workout?.pyramids[0];
    //
    this.training.name = this.formValidator?.trainingName?.value;
    const preWorkoutRestTimeSeconds = parseInt(
      this.formValidator?.preWorkoutRestTime.value
    );
    this.training.preWorkout = new PreWorkout(preWorkoutRestTimeSeconds);
    const postWorkoutRestTimeSecons = parseInt(
      this.formValidator?.postWorkoutRestTime.value
    );
    this.training.postWorkout = new PostWorkout(postWorkoutRestTimeSecons);
    const workoutRestTimeSeconds = parseInt(
      this.formValidator.workoutRestTime?.value
    );
    this.training.workout = new Workout(workoutRestTimeSeconds);
    const workoutReps = parseInt(this.formValidator?.workoutReps?.value);
    for (let i = 0; i < workoutReps; i++) {
      this.training.workout.pyramids.push(firstPyramid);
    }
    this.trainingService.addTraining(this.training);
    this.router.navigate([RoutesPathEnum.Home]);
  }
}
