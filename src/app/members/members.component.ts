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

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  //  animations: [moveIn(), fallIn(), moveInLeft()],
  //  host: {'[@moveIn]': ''}
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

      var userId = firebase.auth().currentUser.uid;
       firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
        console.log(username);
        
        document.getElementById("username").innerHTML = username;
        });
        
    });

  }


  logout() {
     this.af.auth.signOut();
     this.router.navigateByUrl('');
  }

  ngOnInit(): void {
  }

}
