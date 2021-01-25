export enum RoutesPathEnum {
  Home = 'home',
  TrainingCard = 'trainingcard' ,
  TrainingExecution = 'trainingexecution'
}

export enum TrainingStatusEnum {
  // Stop = 'Stop',
  PreWorkout = 'Pre workout',
  Workout = 'Workout',
  PyramidStep = 'PyramidStep',
  PyramidShot = 'PyramidShot',
  PostWorkout = 'Post workout',
  Finish = 'Finish'
}

export enum LocalStorageKeyEnum {
  Trainings = 'adm_trainings'
}

export enum TimerStatusEnum {
  Running = 'running',
  Paused = 'paused',
  Stopped = 'stopped'
}

export enum TimerSoundsEnum {
  Gun = 'gun',
  MachineGun = 'machinegun'
}


export const MILLISEC_SECOND = 1000;
