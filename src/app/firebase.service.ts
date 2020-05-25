import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore , private router: Router) { }

  public currentUser: any;
  public userStatus: any;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);


  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(email:string, password:string, name:string){
  
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse)=>{
       
       let user = {
        authId: userResponse.user.uid,
        username: userResponse.user.email,
        name: name,
        role: "user",
       }
       
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
         
          console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.router.navigate(["/profile"]);
        })
       }).catch(err => {
         console.log(err);
       }) 
     })
    }

    login(email: string, password: string) {

      return (this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("users").ref.where("username", "==", user.user.email)
        .onSnapshot(snap =>{
          snap.forEach(userRef => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            
            this.setUserStatus(this.currentUser)

            this.router.navigate(["/profile"]);
          })
        })
       
      }));
  }


  logOut(){
    this.afAuth.auth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      
      this.currentUser = null;
  
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/"]));

    }).catch((err) => {
      console.log(err);
    })
  }


  userChanges(){
    this.afAuth.auth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)

           
            
              // if(userRef.data().role !== "admin") {
              //  this.ngZone.run(() => this.router.navigate(["/profile"]));
              // }else{
              //  this.ngZone.run(() => this.router.navigate(["/admin"])); 
              // }

              this.ngZone.run(() => this.router.navigate(["/profile"]));
          })
        })
      }else{
         this.ngZone.run(() => this.router.navigate(["/"]));
      }
    })
  }


  newPost(title:string, message:string){
  
    let post = {
     user: this.userStatus.name,
     userId: this.userStatus.authId,
     title: title,
     message: message,
     created: firebase.firestore.FieldValue.serverTimestamp()
    }

    this.firestore.collection('posts').add(post);
 }

//  newComment(message:string, id:string){
  
//   let comment = {
//    user: this.userStatus.name,
//    message: message,
//    created: firebase.firestore.FieldValue.serverTimestamp()
//   }
//   console.log(comment)
//    this.firestore.collection('posts').doc(id).collection('comments').add(comment);
// }

// newCazare(detaliiCazare){

//    this.firestore.collection('cazari').add(detaliiCazare);
// }

}


