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

  postarileMele : boolean = false;
  editeazaProfil : boolean = false;

  start : boolean = true;

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

  myPosts(){

    this.start = false;
    this.editeazaProfil = false;
    this.postarileMele = true;
  }

  startProfile(){
    this.start = true;

    this.postarileMele = false;
    this.editeazaProfil = false;

  }

  editProfile(){

    this.start = false;
    this.editeazaProfil = true;
    this.postarileMele = false;
  }

}
