import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from 'src/app/shared/models/job.model';
import { JobsService } from 'src/app/shared/services/jobs.service';

@Component({
  selector: 'app-listing-jobs',
  templateUrl: './listing-jobs.component.html',
  styleUrls: ['./listing-jobs.component.scss']
})
export class ListingJobsComponent implements OnInit {
  jobs!: any;

  constructor(private jobsService: JobsService,
              private router: Router) { }

  ngOnInit(): void {
    this.jobsService.getAllJobs().subscribe({
      next: (response: any) => {
        this.jobs = response;
      }
    });
  }

  deleteJob(id: string) {
    this.jobsService.delete(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter((j: { id: string; }) => j.id !== id);
      }
    });
  }

  editJob(id: string) {
    this.router.navigate([`jobs/edit/${id}`]);
  }
}
