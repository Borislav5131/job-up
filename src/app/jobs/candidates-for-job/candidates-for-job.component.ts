import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobModel } from 'src/app/shared/models/job.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { JobsService } from 'src/app/shared/services/jobs.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-candidates-for-job',
  templateUrl: './candidates-for-job.component.html',
  styleUrls: ['./candidates-for-job.component.scss']
})
export class CandidatesForJobComponent implements OnInit {
  jobId!: string;
  job!: JobModel;
  usersCandidatesModels: UserModel[] = [];

  constructor(private route: ActivatedRoute, private jobsServer: JobsService, private userService: UserService) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];

    this.jobsServer.getJobById(this.jobId).subscribe(response => {
      this.job = response;

      for(let key in this.job.candidates) {
        this.userService.getUserById(key).subscribe(user => {
          this.usersCandidatesModels.push(user);
        });
      }
    });
  }

  approvedUser(user: UserModel) {
    this.job.candidates[user.id] = true;

    this.jobsServer.putJob(this.job).subscribe();
  }

  notApprovedUser(user: UserModel) {
    this.job.candidates[user.id] = false;

    this.jobsServer.putJob(this.job).subscribe();
  }
}
