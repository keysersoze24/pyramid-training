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

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HomeComponent,
    TrainingCardComponent,
    TrainingExecutionComponent,
    TrainingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
