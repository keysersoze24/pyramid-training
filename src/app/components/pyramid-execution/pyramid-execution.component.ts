import { Component, Input, OnInit } from '@angular/core';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-pyramid-execution',
  templateUrl: './pyramid-execution.component.html',
  styleUrls: ['./pyramid-execution.component.scss']
})
export class PyramidExecutionComponent implements OnInit {

  @Input() training: Training;

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
  }

}
