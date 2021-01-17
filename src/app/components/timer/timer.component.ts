import { Component, Input, OnInit, Output } from '@angular/core';
import { RestTime } from 'src/app/models/rest-time';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() restTime: RestTime;

  constructor() { }

  ngOnInit(): void {
  }

}
