import { SkipassComponent } from './skipass/skipass.component';
import { PartiiComponent } from './partii/partii.component';
import { CazareComponent } from './cazare/cazare.component';
import { ForumComponent } from './forum/forum.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { MembersComponent } from './members/members.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'contact', component: ContactComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  // data: {roles: ["user", "admin"]}
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ["admin"]}},
  { path: 'forum', component: ForumComponent },
  { path: 'cazare', component: CazareComponent },
  { path: 'partii', component: PartiiComponent },
  { path: 'skipass', component: SkipassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
