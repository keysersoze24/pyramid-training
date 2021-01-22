export enum TimerStatusEnum {
  Pending = 1,
  Stopped = 2,
  Expired = 3
}

export enum RoutesPathEnum {
  Home = 'home',
  TrainingCard = 'trainingcard' ,
  TrainingExecution = 'trainingexecution'
}

export enum TrainingStatusEnum {
  Stop = 1,
  PreWorkout = 2,
  Workout = 3,
  PostWorkout = 4,
}

export enum LocalStorageKeyEnum {
  Trainings = 'adm_trainings'
}

export enum TimerModesEnum {
  Countdown = 1,
  Increment = 2
}
