import { User } from './../user.model';
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

  // formTemplateEmail = new FormGroup({
  //   email: new FormControl('')
  // })

  users: User[] = [];
  user: any;
  userId: string;

  constructor(private af: AngularFireAuth, private firebaseService: FirebaseService, private afs: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;

  userAuth = this.af.auth.currentUser;
  ngOnInit(): void {

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

    // this.formTemplateEmail.patchValue({
    //   email: this.userStatus.username 
    // })
    
  }

  onSubmit(formValue){

    if (this.formTemplate.valid) {

      
      this.afs.doc('users/'+ this.userId).update({name : formValue.name});
      alert('Modificarile au fost salvate')
    }

  }

  // onSubmitEmail(formValue){

  //   if (this.formTemplate.valid) {

  //    // console.log(formValue.email)
  //     this.userAuth.updateEmail({email: formValue.email}).then(function() {
  //       this.afs.doc('users/'+ this.userId).update({username : formValue.email});
  //       alert('Modificarile au fost salvate')
  //     }).catch(function(error) {
  //       alert('Eroare')
  //     });
      
  //   }
  // }

}
