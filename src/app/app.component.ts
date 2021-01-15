import { Component } from '@angular/core';
import { Training } from './models/training';
import { LoaderService } from './services/loader.service';
import { TimerStatusEnum } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loaderService: LoaderService) {
    const training = new Training();
   }


}
