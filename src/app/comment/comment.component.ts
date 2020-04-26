import { Comment } from './../comment.model';
import { Observable } from 'rxjs';
import { CommentService } from './../comment.service';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() userId;
  @Input() userName;
  @Input() postId;

  // comments: Comment[];
  message: string;

  constructor(private firebaseService: FirebaseService, private commentService: CommentService) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {

    // this.comments = this.commentService.getPostComments(this.postId);

    // this.commentService.getPostComments(this.postId).subscribe(data => {
    //   this.comments = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...<any>e.payload.doc.data()
    //     } as Comment;
    //   })
    // });


  }

  onSubmit(formData){
    if(formData.valid) {

      this.commentService.setComment(this.userId, this.userName, this.postId, formData.value.message)

      var resetForm=<HTMLFormElement>document.getElementById("CommentForm");
      resetForm.reset();
    }
  
  }
  
  // showVar: boolean = false;
  
  // toggleComments(){
  //     this.showVar = !this.showVar;
  // }
    
}
