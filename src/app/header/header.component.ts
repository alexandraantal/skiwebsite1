import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

import { faMountain } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faMountain = faMountain;

  public isLoggedIn: Boolean;
  
  constructor(public af: AngularFireAuth, private router: Router) { 

    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
  }

}
