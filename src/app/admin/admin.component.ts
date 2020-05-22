import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  name: any;
  state: string = '';
  email: string;

  Name: any;


  constructor(public af: AngularFireAuth,private router: Router) {

    this.af.authState.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this.email = this.name.email;

        const db = firebase.database();
        const users= db.ref('/users/');
      }
        
    });

  }

  ngOnInit(): void {
  }

}

