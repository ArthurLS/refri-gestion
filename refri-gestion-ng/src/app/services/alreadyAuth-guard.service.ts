import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { AuthentificationService } from './authentification.service';
import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class AlreadyAuthGuard implements CanActivate {

  constructor(
    private authenService: AuthentificationService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //Modify isAuth property if a cookie exists
    if (!this.authenService.isLogged()) {
      return true;
    }
    else {
      this.router.navigate(['/fridge']);
    }
    return true;
  }
}
