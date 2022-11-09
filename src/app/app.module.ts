import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListingJobsComponent } from './jobs/listing-jobs/listing-jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CandidatesForJobComponent } from './jobs/candidates-for-job/candidates-for-job.component';
import { UserAppliedJobsComponent } from './users/user-applied-jobs/user-applied-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListingJobsComponent,
    DashboardComponent,
    CreateJobComponent,
    LoginComponent,
    SignupComponent,
    EditUserComponent,
    CandidatesForJobComponent,
    UserAppliedJobsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
