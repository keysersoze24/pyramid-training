import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Training } from 'src/app/models/training';
import { TimerService } from 'src/app/services/timer.service';
import { TrainingService } from 'src/app/services/training.service';
import { RoutesPathEnum } from 'src/app/shared/constants';
import { ConfirmOrDenyButtonsComponent } from '../confirm-or-deny-buttons/confirm-or-deny-buttons.component';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  constructor(
    public trainingService: TrainingService,
    public dialog: MatDialog,
    private router: Router,
    private overlay: Overlay,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.timerService?.stopTimer();
  }

  startTraining(training: Training) {
    this.router.navigate([RoutesPathEnum.TrainingExecution], {
      state: { trainingId: training.id },
    });
  }

  editTraining(training: Training) {
    this.router.navigate([RoutesPathEnum.TrainingCard], {
      state: { training: training },
    });
  }

  deleteTraining(training: Training) {
    const dialogRef = this.dialog.open(ConfirmOrDenyButtonsComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: { title: `Do you really want to delete ${training?.name}?` },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.deleteTraining(training.id);
      }
    });
  }
}
