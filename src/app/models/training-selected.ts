import { TrainingStatusEnum } from '../shared/constants';
import { RestTime } from './rest-time';
import { Training } from './training';

export class TrainingSelected {
  training: Training;
  status: TrainingStatusEnum;

  get restTime(): RestTime {
    let result: RestTime;
    switch (this.status) {
      case TrainingStatusEnum.PreWorkout:
        result = this.training.preWorkout.restTime;
        break;
      case TrainingStatusEnum.Workout:
        result = this.training.workout.restTime;
        break;
      case TrainingStatusEnum.PostWorkout:
        result = this.training.postWorkout.restTime;
        break;
      default:
        break;
    }
    return result;
  }

  constructor(status: TrainingStatusEnum, training: Training) {
    this.status = status;
    this.training = training;
  }
}
