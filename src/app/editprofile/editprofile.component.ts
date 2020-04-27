import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  formTemplate = new FormGroup({
    name: new FormControl('')
  })

  constructor(private af: AngularFireAuth, private firebaseService: FirebaseService, private firestore: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;

  userAuth = this.af.auth.currentUser;
  userDb = this.firebaseService.currentUser;

  ngOnInit(): void {

    this.formTemplate.patchValue({
      name: this.userStatus.name  
    })
    
  }

  onSubmit(formValue){

    if (this.formTemplate.valid) {

      console.log(this.userDb.id)
      //this.firestore.doc('users/'+ this.userStatus.id).update({name : formValue.name});
    }

  }

}
