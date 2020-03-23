import { Post } from './post.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: AngularFirestore) { }

  getPosts() {
    return this.firestore.collection<Post>('posts', ref => ref.orderBy('created', 'desc')).snapshotChanges();
}

deletePost(postId: string){
  this.firestore.doc('posts/' + postId).delete();
}

createPost(post: Post){
  return this.firestore.collection('posts').add(post);
}
}
