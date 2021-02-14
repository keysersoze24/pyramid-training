import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { TimerComponent } from './components/timer/timer.component';
import { HomeComponent } from './components/home/home.component';
import { TrainingCardComponent } from './components/training-card/training-card.component';
import { TrainingExecutionComponent } from './components/training-execution/training-execution.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { ConfirmOrDenyButtonsComponent } from './components/confirm-or-deny-buttons/confirm-or-deny-buttons.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DividerComponent } from './components/divider/divider.component';
import { PyramidCardComponent } from './components/pyramid-card/pyramid-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ConfigComponent } from './components/config/config.component';
import { WorkoutExecutionComponent } from './components/workout-execution/workout-execution.component';
import { TrainingExecutionButtonsComponent } from './components/training-execution-buttons/training-execution-buttons.component';
import { AppStatusTitleComponent } from './components/app-status-title/app-status-title.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HomeComponent,
    TrainingCardComponent,
    TrainingExecutionComponent,
    TrainingListComponent,
    ConfirmOrDenyButtonsComponent,
    ToolbarComponent,
    DividerComponent,
    PyramidCardComponent,
    ConfigComponent,
    WorkoutExecutionComponent,
    TrainingExecutionButtonsComponent,
    AppStatusTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
