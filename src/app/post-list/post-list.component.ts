import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  Posts: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(){
  
    this.firebaseService.getPosts().subscribe(res => (this.Posts = res));

     console.log(this.Posts)
  }


}
