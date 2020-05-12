import { FormGroup, FormControl } from '@angular/forms';
import { Post } from './../post.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostService } from './../post.service';
import { PaginationService } from './../pagination.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';


import { faComment, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  
  faComment = faComment;
  faTrash = faTrash;
  faEdit = faEdit; 
  comment: string;

  posts: Post[] = [];

  pageOfItems: Array<any>;

  // title: string;
  // message: string;

  isSubmitted: boolean;

  formTemplate = new FormGroup({
    title: new FormControl(''),
    message: new FormControl('')
  })

  constructor(private firebaseService: FirebaseService, private router: Router,private firestore: AngularFirestore, private postService: PostService, private paginationService: PaginationService ){}

  
  // Array of all items
private allItems: any = [];

// Pagination object
pagination: any = {};

// Paged items
pagedItems: any[];


userStatus = this.firebaseService.userStatus;

isModalActive: boolean = false;

  isUpdate: boolean = false;
  editId: string;

ngOnInit(){

  this.postService.getPosts().subscribe(data => {
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

buttonPress(){
  if(this.userStatus){
    // this.router.navigate(["/post"]);
    
    this.isModalActive = !this.isModalActive;
  }
  else {
    this.router.navigate(["/login-email"]);
  }
  
}

// onSubmit(formData) {
//   if(formData.valid) {
//     this.firebaseService.newPost(formData.value.title, formData.value.message);
//     var resetForm=<HTMLFormElement>document.getElementById("myForm");
//     resetForm.reset();
//     this.isModalActive = false;
//   }
// }

onSubmit(formValue) {
  this.isSubmitted = true;
  
if (this.formTemplate.valid) {
let data = Object.assign({}, formValue);
delete data.id;

if(!this.isUpdate)
this.firebaseService.newPost(formValue.title, formValue.message);
else
  {
    this.firestore.doc('posts/'+ this.editId).update(data);
    this.isUpdate = false;
  }


this.resetForm();
this.isModalActive=false;
}
}

resetForm() {
  this.formTemplate.reset();
  this.formTemplate.setValue({
    title: '',
    message: ''
  });
  this.isSubmitted = false;
  }

toggleModal() {
  this.isModalActive = !this.isModalActive;
}


delete(id: string) {
this.firestore.doc('posts/' + id).delete();
} 

onEdit(post : Post, id: string ){
  this.isModalActive=true;
  this.isUpdate = true; 
  this.editId = id;

  this.formTemplate.patchValue({
   title: post.title,
   message: post.message  
 })
}


setPage(page: number) {
if (page < 1 || page > this.pagination.totalPages) {
  return;
}
// Get pagination object from service
this.pagination = this.paginationService.getPagination(this.posts.length, page);

// Get current page of items
this.pagedItems = this.posts.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
}



}
