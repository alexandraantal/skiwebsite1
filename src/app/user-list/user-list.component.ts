import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private firebaseService: FirebaseService, private afs: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {

    this.afs.collection<User>('users').snapshotChanges().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as User;
        
      })
      console.log(this.users)
    });

  }

  
  create(user: User){
    this.afs.collection('users').add(user);
}

  delete(id: string) {
  this.afs.doc('users/' + id).delete();
} 

}

