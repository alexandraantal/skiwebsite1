import { Router } from '@angular/router';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  title: string;
  message: string;

  constructor(private firebaseService: FirebaseService, private router: Router){}

userStatus = this.firebaseService.userStatus;

isModalActive: boolean = false;

buttonPress(){
  if(this.userStatus){
    // this.router.navigate(["/post"]);
    
    this.isModalActive = !this.isModalActive;
  }
  else {
    this.router.navigate(["/login-email"]);
  }
  
}

onSubmit(formData) {
  if(formData.valid) {
    this.firebaseService.newPost(formData.value.title, formData.value.message);
    var resetForm=<HTMLFormElement>document.getElementById("myForm");
    resetForm.reset();
    this.isModalActive = false;
  }
}

ngOnInit(){
  
}

toggleModal() {
  this.isModalActive = !this.isModalActive;
}


}
