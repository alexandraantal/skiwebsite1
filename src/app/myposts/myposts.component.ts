import { PaginationService } from './../pagination.service';
import { PostService } from './../post.service';
import { Post } from './../post.model';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { faComment, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {

  faComment = faComment;
  faTrash = faTrash;
  comment: string;

  posts: Post[] = [];

  pageOfItems: Array<any>;

  constructor(private firebaseService: FirebaseService, private afs: AngularFirestore, private postService: PostService, private paginationService: PaginationService) { }

  
  // Array of all items
private allItems: any = [];

// Pagination object
pagination: any = {};

// Paged items
pagedItems: any[];

userStatus = this.firebaseService.userStatus;

ngOnInit(){

  this.postService.getUserPosts(this.userStatus.id).subscribe(data => {
    this.posts = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...<any>e.payload.doc.data()
      } as Post;
      
    })
   // console.log(this.posts)

   this.allItems = this.posts;   // Load data into allItems
  this.setPage(1); 
  
  });

}


create(post: Post){
  this.postService.createPost(post);
}

delete(id: string) {
this.postService.deletePost(id);
} 


setPage(page: number) {
if (page < 1 || page > this.pagination.totalPages) {
  return;
}
// Get pagination object from service
this.pagination = this.paginationService.getPagination(this.posts.length, page,1);

// Get current page of items
this.pagedItems = this.posts.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
}

  

}
