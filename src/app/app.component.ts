import { Component } from '@angular/core';
import { Workout } from './models/workout';
import { LoaderService } from './services/loader.service';
import { TimerService } from './services/timer.service';
import { TimerStatusEnum } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  workout: Workout;

  constructor(public loaderService: LoaderService, public timerService: TimerService) {
    this.startTimer(10);
  }


   async startTimer(seconds: number) {
    const timerStatus = await this.timerService.startTimer(seconds);
    if (timerStatus == TimerStatusEnum.Expired) {
      window.alert('timer expired');
    }
   }



}
