import { FirebaseService } from '../firebase.service';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';  
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

 import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

 import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  faGoogle = faGoogle;

  email: string;
  password: string;

  state: string = '';
  loginError: any = "";

  constructor(public af: AngularFireAuth,private router: Router, private firebaseService: FirebaseService) {
}


onSubmit(formData) {
  if(formData.valid) {
    console.log(formData.value);

    this.firebaseService.login(formData.value.email, formData.value.password).catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":{
            this.loginError = "Adresa de email este invalida.";
            break;
         }
        case "auth/wrong-password":{
            this.loginError = "Parola este gresita.";
            break;
         }
        case "auth/user-not-found":{
           this.loginError = "Utilizatorul nu exista.";
           break;
        }
           default:{
            this.loginError = "Eroare neasteptata";
            break;
        }
   }
   console.log(this.loginError)
})
  }  
}

  ngOnInit(): void {
  }

}
