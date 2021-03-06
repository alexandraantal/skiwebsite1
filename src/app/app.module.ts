import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './auth.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './admin/admin.component';
import { ForumComponent } from './forum/forum.component';
import { CazareComponent } from './cazare/cazare.component';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { CazareListComponent } from './cazare-list/cazare-list.component';
import { StarReviewComponent } from './star-review/star-review.component';
import { CommentComponent } from './comment/comment.component';
import { PartiiComponent } from './partii/partii.component';
import { PartiiListComponent } from './partii-list/partii-list.component';
import { SkipassComponent } from './skipass/skipass.component';
import { RatingComponent } from './rating/rating.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { VremeaComponent } from './vremea/vremea.component';
import { WebcamComponent } from './webcam/webcam.component';
import { ServiciiComponent } from './servicii/servicii.component';
import { ProfileComponent } from './profile/profile.component';
import { MypostsComponent } from './myposts/myposts.component';
import { UserListComponent } from './user-list/user-list.component';
import { ScolischiComponent } from './scolischi/scolischi.component';
import { RentComponent } from './rent/rent.component';
import { SkiserviceComponent } from './skiservice/skiservice.component';




export const firebaseConfig = {
  apiKey: "AIzaSyCgHU0VysKuDjqdsCdY0VDQpDkzg77b8F8",
  authDomain: "user-service-ski.firebaseapp.com",
  databaseURL: "https://user-service-ski.firebaseio.com",
  projectId: "user-service-ski",
  storageBucket: "user-service-ski.appspot.com",
  messagingSenderId: "38971873329"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    EmailComponent,
    SignupComponent,
    AdminComponent,
    ForumComponent,
    CazareComponent,
    CazareListComponent,
    StarReviewComponent,
    CommentComponent,
    PartiiComponent,
    PartiiListComponent,
    SkipassComponent,
    RatingComponent,
    CommentListComponent,
    VremeaComponent,
    WebcamComponent,
    ServiciiComponent,
    ProfileComponent,
    MypostsComponent,
    UserListComponent,
    ScolischiComponent,
    RentComponent,
    SkiserviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,
    AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
