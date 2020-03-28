import { FirebaseService } from './../firebase.service';
import { CazareService } from './../cazare.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from "rxjs/operators";

import { AngularFireStorage } from '@angular/fire/storage';

import { faUpload} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cazare',
  templateUrl: './cazare.component.html',
  styleUrls: ['./cazare.component.scss']
})
export class CazareComponent implements OnInit {


  constructor(private firebaseService: FirebaseService, private storage: AngularFireStorage, private router: Router, private service: CazareService) { }

  userStatus = this.firebaseService.userStatus;
 

  ngOnInit(): void {
     }


}
