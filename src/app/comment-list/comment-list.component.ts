import { AngularFirestore } from '@angular/fire/firestore';
import { CommentService } from './../comment.service';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit, Input } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  faTrash = faTrash;

  @Input() postId;
  @Input() userPostId;

  comments: Comment[];

  constructor(private firebaseService: FirebaseService, private commentService: CommentService, private firestore: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {

    this.commentService.getPostComments(this.postId).subscribe(data => {
      this.comments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Comment;
      })
    });


  }

  showVar: boolean = false;
  
  toggleComments(){
      this.showVar = !this.showVar;
  }

  delete(id: string) { 
    this.firestore.doc('comments/' + id).delete();
}
    

}
