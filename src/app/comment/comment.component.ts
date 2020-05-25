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

  message: string;

  constructor(private firebaseService: FirebaseService, private commentService: CommentService) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {
    
  }

  onSubmit(formData){
    if(formData.valid) {

      this.commentService.setComment(this.userId, this.userName, this.postId, formData.value.message)

      var resetForm=<HTMLFormElement>document.getElementById("CommentForm");
      resetForm.reset();
    }
  
  }
  
    
}
