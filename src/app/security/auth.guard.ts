import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesPathsEnum } from '../shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true;
  }
}
