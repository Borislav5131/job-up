import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from 'src/app/shared/models/job.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { JobsService } from 'src/app/shared/services/jobs.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-listing-jobs',
  templateUrl: './listing-jobs.component.html',
  styleUrls: ['./listing-jobs.component.scss']
})
export class ListingJobsComponent implements OnInit {
  jobs!: any;
  isCompany!: boolean;
  companyId!: string | null;
  user!: UserModel;

  constructor(private jobsService: JobsService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    localStorage.getItem('role') === 'Company' ? this.isCompany = true : false;
    this.companyId = localStorage.getItem('userId');

    this.userService.getUserById(localStorage.getItem('userId')!).subscribe(response => {
      this.user = response;
    });

    this.jobsService.getAllJobs().subscribe({
      next: (response: JobModel[]) => {
        this.jobs = response;
      }
    });
  }

  deleteJob(job: JobModel) {
    this.jobsService.delete(job.id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter((j: { id: string; }) => j.id !== job.id);
      }
    });
  }

  editJob(job: JobModel) {
    this.router.navigate([`jobs/edit/${job.id}`]);
  }

  likeJob(job: JobModel) {
    let userId = localStorage.getItem('userId');

    if(userId) {
      if(job.likes.includes(userId)) {
        alert('You already like this job!');
      }
      else if(job.isActive === false) {
        alert('Job is not active!')
      } else {
        job.likes.push(userId);
        this.jobsService.putJob(job).subscribe();
      }
    }
  }

  apply(job: JobModel) {
    if(!this.user.jobPositions.includes(job.id) && !job.candidates[this.user.id]) {
      this.user.jobPositions.push(job.id);
      job.candidates[this.user.id] = false;

      this.userService.updateUser(this.user).subscribe();
      this.jobsService.putJob(job).subscribe();

      alert('You applied to this job!');
    } else {
      alert('You already applied to this job!');
    }
  }

  deactivate(job: JobModel) {
    job.isActive = false;
    this.jobsService.putJob(job).subscribe({
      next: () => {
        this.router.navigate(['/jobs']);
      }
    });
  }

  activate(job: JobModel) {
    job.isActive = true;
    this.jobsService.putJob(job).subscribe({
      next: () => {
        this.router.navigate(['/jobs']);
      }
    });
  }

  goToCandidates(jobId: string) {
    this.router.navigate([`jobs/candidates/${jobId}`]);
  }

  goToUserAppliedJobs() {
    this.router.navigate([`user/appliedJobs`]);
  }
}
