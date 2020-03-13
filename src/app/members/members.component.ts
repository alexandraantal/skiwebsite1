import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
 import { moveIn, fallIn, moveInLeft } from '../router.animations';

 var username;
 var userType; 

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})

export class MembersComponent implements OnInit {

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
    // var userId = firebase.auth().currentUser.uid;

    // firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //   username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
    //   userType = (snapshot.val() && snapshot.val().userType) || 'Anonymous';

    //   // console.log(userType);
      
    //   document.getElementById("username").innerHTML = username;
    //   });

    //   console.log(userType);
  }

}
