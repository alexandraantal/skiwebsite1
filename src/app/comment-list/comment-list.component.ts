import { CommentService } from './../comment.service';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() postId;

  comments: Comment[];

  constructor(private firebaseService: FirebaseService, private commentService: CommentService) { }

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
    

}
