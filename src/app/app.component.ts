import { Component } from '@angular/core';
import { DoublePyramid } from './models/double-pyramid';
import { Training } from './models/training';
import { WorkoutRestTime } from './models/training-rest-time';
import { Workout } from './models/workout';
import { LoaderService } from './services/loader.service';
import { TimerStatusEnum } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loaderService: LoaderService) {  }

   async startTimer() {
    const workoutRestTime = new WorkoutRestTime(3000);
    const workout = new Workout({ basePyramid: 5, apexPyramid: 1, reverse: true }, 8, workoutRestTime);
    await workout.workoutRestTime.startTimer();
   }


}
