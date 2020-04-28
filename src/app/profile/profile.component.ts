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

  users : boolean = false;

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
    this.users = false;
  }

  startProfile(){
    this.start = true;

    this.postarileMele = false;
    this.editeazaProfil = false;
    this.users = false;

  }

  editProfile(){

    this.start = false;
    this.editeazaProfil = true;
    this.postarileMele = false;
    this.users = false;
  }

  userList(){
    this.start = false;
    this.editeazaProfil = false;
    this.postarileMele = false;
    this.users = true;
  }

}
