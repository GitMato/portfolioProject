import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import { AuthService } from './auth.service';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  //https://angular.io/guide/router#!#guards
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string){
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted url
    this.authService.redirectUrl = url;

    this.router.navigate(['login']);
    return false;
  }
}
