import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  //  animations: [moveIn(), fallIn()],
  //  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  
  email: string;
  password: string;

  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth,private router: Router) {

  }

    onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password ).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  ngOnInit(): void {
  }

}
