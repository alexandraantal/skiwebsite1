import { FirebaseService } from './firebase.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    // constructor(private auth: AngularFireAuth, private router: Router) {}

    // canActivate(): Observable<boolean> {
    //   return this.auth.authState
    //     .take(1)
    //     .map(state => !!state)
    //     .do(authenticated => {
    //   if 
    //     (!authenticated) this.router.navigate([ '/login' ]);
    //   })
    // }


    constructor(private firebaseService: FirebaseService, private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const currentUser = this.firebaseService.currentUser;
    if(currentUser){
      //check if the route is retricted by role
      if(next.data.roles && next.data.roles.indexOf(currentUser.role) === -1){
        //role not authorized
        this.router.navigate(["/email"])
      
      }else{
        return true;
      }
    }
    
  }
 
}