import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';  
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
 import { moveIn, fallIn } from '../router.animations';

 import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

 import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  //  animations: [moveIn(), fallIn()],
  //  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  faGoogle = faGoogle;

  email: string;
  password: string;

  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth,private router: Router, private firebaseService: FirebaseService) {
  // this.af.authState.subscribe(auth => { 
  //   if(auth) {
  //     this.router.navigateByUrl('/members');
  //   }
  // });
}


onSubmit(formData) {
  if(formData.valid) {
    console.log(formData.value);
    // this.af.auth.signInWithEmailAndPassword(
    //   formData.value.email,
    //   formData.value.password
    //   ).then(
    //   (success) => {
    //   console.log(success);

    //   this.router.navigate(['/members'])
    // }).catch(
    //   (err) => {
    //   console.log(err);
    //   this.error = err;
    // })

    this.firebaseService.login(formData.value.email, formData.value.password);

  }
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
