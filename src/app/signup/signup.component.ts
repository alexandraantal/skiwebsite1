import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { FirebaseService } from "../firebase.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;
  
  email: string;
  password: string;
  name: string;

  state: string = '';

  signupError: any = "";
  

  constructor(public af: AngularFireAuth,private router: Router, private db: AngularFireDatabase, private firebaseService: FirebaseService) {

  }

    onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);

      this.firebaseService.signUp(formData.value.email, formData.value.password, formData.value.name)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":{
              this.signupError = "Utilizatorul exista deja.";
              break;
           }
          case "auth/invalid-email":{
              this.signupError = "Adresa de email invalida.";
              break;
           }
          case "auth/weak-password":{
             this.signupError = "Parola este prea slaba";
             break;
          }
             default:{
              this.signupError = "Eroare neasteptata";
              break;
          }
     }    
  })
 }
}

  

  ngOnInit(): void {
  }

}
