import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { ListingJobsComponent } from './jobs/listing-jobs/listing-jobs.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'jobs',
    children: [
      {path: '', component: ListingJobsComponent},
      {path: 'create', component: CreateJobComponent},
      {path: 'edit/:id', component: CreateJobComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
