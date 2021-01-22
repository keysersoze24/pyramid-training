import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Training } from "src/app/models/training";

export class TrainingCardFormValidator {

  private _formGroup: FormGroup;
  get formGroup(): FormGroup  { return this._formGroup };

  get trainingName() { return this._formGroup.get('trainingName') };
  get preWorkoutRestTime() { return this._formGroup.get('preWorkoutRestTime') };
  get workoutReps() { return this._formGroup.get('workoutReps') };
  get workoutRestTime() { return this._formGroup.get('workoutRestTime') };
  get postWorkoutRestTime() { return this._formGroup.get('postWorkoutRestTime') };

  constructor(fb: FormBuilder, training: Training) {
    this._formGroup = fb.group({
      trainingName: [training?.name, [Validators.required]],
      preWorkoutRestTime: [training?.preWorkout?.restTime?.secondsSet, [Validators.required, Validators.min(1)]],
      workoutReps: [training?.workout?.pyramids?.length, [Validators.required, Validators.min(1)]],
      workoutRestTime: [training?.workout?.restTime?.secondsSet, [Validators.required, Validators.min(1)]],
      postWorkoutRestTime: [training?.postWorkout?.restTime?.secondsSet, [Validators.required, Validators.min(1)]]
    })
  }

}
