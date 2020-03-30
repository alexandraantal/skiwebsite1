import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class CommentService {

  
  constructor(private afs: AngularFirestore) { }

  // getUserComments(userId) {
  //   const commRef = this.afs.collection('comments', ref => ref.where('userId', '==', userId) );
  //   return commRef.valueChanges();
  // }

  getPostComments(postId) {
    // const commRef = this.afs.collection('stars', ref => ref.where('postId', '==', postId) );
    // return commRef.valueChanges();

    const commRef = this.afs.collection<Comment>('comments', ref => ref.where('postId', '==', postId) );
    return commRef.snapshotChanges();
    
  }

  setComment(userId, postId, message) {
  
    let comment= { userId: userId, postId: postId, message: message };

    // const commentPath = `comments/${comment.userId}_${comment.postId}`;

    // return this.afs.doc(commentPath).set(comment);

    return this.afs.collection('comments').add(comment);
}
}
