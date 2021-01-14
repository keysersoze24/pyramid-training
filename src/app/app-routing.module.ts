import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./security/auth.guard";
import { RoutesPathsEnum } from "./shared/constants";


const routes: Routes = [
  { path: RoutesPathsEnum.Home, component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  // wildcard routes
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
