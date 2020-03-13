import { Component } from '@angular/core';
import { FirebaseService } from "./firebase.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skiwebsite';

  // constructor(private firebaseService: FirebaseService){}

  // userStatus = this.firebaseService.userStatus;

  // ngOnInit(){
  //   this.firebaseService.userChanges();

  //   this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);
  //   console.log(this.userStatus)
  // }
}
