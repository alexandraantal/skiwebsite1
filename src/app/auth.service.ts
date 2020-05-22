import { FirebaseService } from './firebase.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private firebaseService: FirebaseService, private router: Router){}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<boolean> | Promise<boolean> | boolean {
    
    const currentUser = this.firebaseService.currentUser;
    if(currentUser){
      if(next.data.roles && next.data.roles.indexOf(currentUser.role) === -1){
         this.router.navigate(["/email"]) 
      }else{
        return true;
      }
    }
  }
}