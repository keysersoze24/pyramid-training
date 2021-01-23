import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-pyramid-execution',
  templateUrl: './pyramid-execution.component.html',
  styleUrls: ['./pyramid-execution.component.scss']
})
export class PyramidExecutionComponent implements OnInit {

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }

}
