import { Component, OnInit, HostBinding } from '@angular/core';

// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
 import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //  animations: [moveIn()],
  //  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(public af: AngularFireAuth,private router: Router) {

    this.af.authState.subscribe(auth => { 
    if(auth) {
      this.router.navigateByUrl('/members');
    }
  });
}


loginGoogle() {
  this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
      this.router.navigate(['/members']);
    }).catch(
      (err) => {
      this.error = err;
    })
}

  ngOnInit(): void {
  }

}
