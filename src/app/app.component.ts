import { Component } from '@angular/core';
import { RestTime } from './models/rest-time';
import { Workout } from './models/workout';
import { LoaderService } from './services/loader.service';
import { TimerStatusEnum } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public loaderService: LoaderService) { }

}
