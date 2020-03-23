import { Comm } from './../comm.model';
import { PostService } from './../post.service';
import { Post } from './../post.model';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { faComment, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  faComment = faComment;
  faTrash = faTrash;
  comment: string;

  // postsCollectionRef: AngularFirestoreCollection<Post>;
  // posts$: Observable<Post[]>;

  posts: Post[];
  comments: Comm[];


  constructor(private firebaseService: FirebaseService, private afs: AngularFirestore, private postService: PostService) { 

    // this.postsCollectionRef = this.afs.collection<Post>('posts', ref => ref.orderBy('created', 'desc'));
    // this.posts$ = this.postsCollectionRef.valueChanges();

    //console.log(this.posts$)

  }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(){

    this.postService.getPosts().subscribe(data => {
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Post;
      })
    });

  }

  create(post: Post){
    this.postService.createPost(post);
}

  delete(id: string) {
  this.postService.deletePost(id);
} 

onSubmit(formData, id: string){
  if(formData.valid) {
    this.firebaseService.newComment(formData.value.comment, id);
    var resetForm=<HTMLFormElement>document.getElementById("myForm");
    resetForm.reset();
  }

}

showVar: boolean = false;

toggleComments(){
    this.showVar = !this.showVar;
}
  

}
