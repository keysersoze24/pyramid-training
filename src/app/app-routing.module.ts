import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrainingCardComponent } from './components/training-card/training-card.component';
import { TrainingExecutionComponent } from './components/training-execution/training-execution.component';
import { RoutesPathEnum } from './shared/constants';


const routes: Routes = [
  {
    path: RoutesPathEnum.Home, component: HomeComponent
  },
  {
    path: RoutesPathEnum.TrainingCard, component: TrainingCardComponent
  },
  {
    path: RoutesPathEnum.TrainingExecution, component: TrainingExecutionComponent
  },
  {
    path:'**', component:HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
