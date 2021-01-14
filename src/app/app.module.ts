import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { TrainingCardComponent } from './components/training-card/training-card.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthGuard } from './security/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    TrainingListComponent,
    TrainingCardComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
