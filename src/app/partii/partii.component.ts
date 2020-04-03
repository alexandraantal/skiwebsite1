import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

import { faSquare, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-partii',
  templateUrl: './partii.component.html',
  styleUrls: ['./partii.component.scss']
})
export class PartiiComponent implements OnInit {

  faSquare = faSquare;
  faTimes = faTimes;
  faCheck = faCheck;

  constructor(private firebaseService: FirebaseService) { }

  userStatus = this.firebaseService.userStatus;


  ngOnInit(): void {
  }


}
