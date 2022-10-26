import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupSuccessSnackBarComponent } from './components/signup-success-snack-bar/signup-success-snack-bar.component';
import { UsersComponent } from './pages/users/users.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDeleteConfirmDialogComponent } from './components/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostListComponent } from './pages/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    SignupComponent,
    SignupSuccessSnackBarComponent,
    UsersComponent,
    UserCreateComponent,
    LogoutConfirmComponent,
    UserUpdateComponent,
    UserDeleteConfirmDialogComponent,
    ProfileComponent,
    AboutComponent,
    PasswordChangeComponent,
    PostFormComponent,
    PostListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatFileInputModule,
    MomentDateModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
