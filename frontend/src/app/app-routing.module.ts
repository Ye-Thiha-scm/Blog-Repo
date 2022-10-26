import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UsersComponent } from './pages/users/users.component';
import { UserResolverService } from './resolvers/user-resolver.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { Role } from './interfaces/role.model';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: { roles: [Role.Admin] },
    resolve: { users: UserResolverService }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'passwordchange',
    component: PasswordChangeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    component: PostFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post-list',
    component: PostListComponent,
    canActivate: [AuthGuard]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
