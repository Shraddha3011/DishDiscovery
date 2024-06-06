import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CognitoService } from './cognito-service.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private cognitoService: CognitoService, private router: Router) {}
  canActivate(): Promise<boolean> {
    return this.cognitoService.isAuthenticated().then((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    });
  }
}
