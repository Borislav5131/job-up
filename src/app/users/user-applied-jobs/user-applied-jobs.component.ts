import { Component, OnInit } from '@angular/core';
import { JobCategory } from 'src/app/shared/enums/job-category.enum';
import { JobType } from 'src/app/shared/enums/job-type.enum';
import { JobModel } from 'src/app/shared/models/job.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { JobsService } from 'src/app/shared/services/jobs.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-applied-jobs',
  templateUrl: './user-applied-jobs.component.html',
  styleUrls: ['./user-applied-jobs.component.scss']
})
export class UserAppliedJobsComponent implements OnInit {
  user!: UserModel;
  jobsThatUserApplied: any[] = [];

  constructor(private usersService: UserService, private jobService: JobsService) { }

  ngOnInit(): void {
    this.usersService.getUserById(localStorage.getItem('userId')!).subscribe(response => {
      this.user = response;

      this.user.jobPositions.forEach(jobId => {
        this.jobService.getJobById(jobId).subscribe(response => {
          this.jobsThatUserApplied.push(response);
        })
      })
    })
  }

}
