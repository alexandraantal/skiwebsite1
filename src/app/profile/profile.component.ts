import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from './../firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

import { faUser, faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formTemplate = new FormGroup({
    name: new FormControl('')
  })

  users: User[] = [];
  user: any;
  userId: string;


  faUser = faUser;
  faEdit = faEdit;

  postarileMele : boolean = false;
  editeazaProfil : boolean = false;

  userl : boolean = false;

  start : boolean = true;

  isModalActive: boolean = false;

  constructor(public af: AngularFireAuth, private router: Router, private firebaseService: FirebaseService, private afs: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {

    this.firebaseService.userChanges();

    this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);

    this.afs.collection<User>('users', ref => ref.where('authId', '==', this.userStatus.authId)).snapshotChanges().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as User;
        
      })
      this.user=this.users[0];
      this.userId = this.user.id;
      console.log(this.userId)
    });


   

    this.formTemplate.patchValue({
      name: this.userStatus.name  
    })

    console.log(this.userStatus);
  }

  logout(){
    this.firebaseService.logOut();
    
  }

  myPosts(){

    this.start = false;
    this.editeazaProfil = false;
    this.postarileMele = true;
    this.userl = false;
  }

  startProfile(){
    this.start = true;

    this.postarileMele = false;
    this.editeazaProfil = false;
    this.userl = false;

  }

  editProfile(){

    this.start = false;
    this.editeazaProfil = true;
    this.postarileMele = false;
    this.userl = false;
  }

  userList(){
    this.start = false;
    this.editeazaProfil = false;
    this.postarileMele = false;
    this.userl = true;
  }

  // buttonPress(){
  //   this.isModalActive = !this.isModalActive;
  // }

  onSubmit(formValue){

    if (this.formTemplate.valid) {

      
      this.afs.doc('users/'+ this.userId).update({name : formValue.name});
      //alert('Modificarile au fost salvate');
      this.toggleModal();
    }

  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
