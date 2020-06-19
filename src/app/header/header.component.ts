import { FirebaseService } from './../firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';

import { faMountain, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faMountain = faMountain;
  faUser = faUser;
  faBars = faBars;

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;


constructor(private firebaseService: FirebaseService){}

userStatus = this.firebaseService.userStatus;

logout(){
  this.firebaseService.logOut();
  
}

ngOnInit(){
  this.firebaseService.userChanges();

  this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);
  console.log(this.userStatus)

}

toggleNavbar() {
  this.navBurger.nativeElement.classList.toggle('is-active');
  this.navMenu.nativeElement.classList.toggle('is-active');
}


}
