import { SkiserviceComponent } from './skiservice/skiservice.component';
import { RentComponent } from './rent/rent.component';
import { ScolischiComponent } from './scolischi/scolischi.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiciiComponent } from './servicii/servicii.component';
import { WebcamComponent } from './webcam/webcam.component';
import { VremeaComponent } from './vremea/vremea.component';
import { SkipassComponent } from './skipass/skipass.component';
import { PartiiComponent } from './partii/partii.component';
import { CazareComponent } from './cazare/cazare.component';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';



import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { MembersComponent } from './members/members.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'forum', component: ForumComponent },
  { path: 'cazare', component: CazareComponent },
  { path: 'partii', component: PartiiComponent },
  { path: 'skipass', component: SkipassComponent},
  { path: 'vreme', component: VremeaComponent},
  { path: 'webcam', component: WebcamComponent},
  { path: "servicii", component: ServiciiComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'school', component: ScolischiComponent},
  { path: 'rent', component: RentComponent},
  { path: 'skiservice', component: SkiserviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
