import { FirebaseService } from './../firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faUser = faUser;

  constructor(public af: AngularFireAuth, private router: Router, private firebaseService: FirebaseService) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {

    this.firebaseService.userChanges();

    this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);

    console.log(this.userStatus);
  }

  logout(){
    this.firebaseService.logOut();
    
  }

}
