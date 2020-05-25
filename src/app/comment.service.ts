import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  
  constructor(private afs: AngularFirestore) { }


  getPostComments(postId) {

    const commRef = this.afs.collection<Comment>('comments', ref => ref.where('postId', '==', postId) );
    return commRef.snapshotChanges();
    
  }

  setComment(userId, userName, postId, message) {
  
    let comment= { userId: userId, userName: userName, postId: postId, message: message };

    return this.afs.collection('comments').add(comment);
}
}
