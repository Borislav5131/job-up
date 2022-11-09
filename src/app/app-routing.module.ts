import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatesForJobComponent } from './jobs/candidates-for-job/candidates-for-job.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { ListingJobsComponent } from './jobs/listing-jobs/listing-jobs.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UserAppliedJobsComponent } from './users/user-applied-jobs/user-applied-jobs.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'jobs',
    children: [
      {path: '', component: ListingJobsComponent},
      {path: 'create', component: CreateJobComponent},
      {path: 'edit/:id', component: CreateJobComponent},
      {path: 'candidates/:id', component: CandidatesForJobComponent},
    ], canActivate:[AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/edit/:id', component: EditUserComponent, canActivate:[AuthGuard]},
  {path: 'user/appliedJobs', component: UserAppliedJobsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
