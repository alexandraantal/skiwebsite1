import { Post } from './../post.model';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


  postsCollectionRef: AngularFirestoreCollection<Post>;
  posts$: Observable<Post[]>;

  constructor(private firebaseService: FirebaseService, private afs: AngularFirestore) { 

    this.postsCollectionRef = this.afs.collection<Post>('posts', ref => ref.orderBy('created', 'desc'));
    this.posts$ = this.postsCollectionRef.valueChanges();

    // console.log(this.posts$)

  }

  ngOnInit(){

  }


}
