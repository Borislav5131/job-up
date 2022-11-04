import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCategory } from 'src/app/shared/enums/job-category.enum';
import { JobType } from 'src/app/shared/enums/job-type.enum';
import { JobModel } from 'src/app/shared/models/job.model';
import { JobsService } from 'src/app/shared/services/jobs.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createForm!: FormGroup;
  job!: any;
  isEdit!: boolean;

  constructor(private formBuilder: FormBuilder,
              private jobsService: JobsService,
              private router: Router,
              private route: ActivatedRoute) { }

  public jobTypes(): Array<string> {
    const keys = Object.keys(JobType);
    return keys.slice(keys.length / 2);
  }

  public jobCategories(): Array<string> {
    const keys = Object.keys(JobCategory);
    return keys.slice(keys.length / 2);
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      type: ['',Validators.required],
      category: ['',Validators.required]
    });

    const id = this.route.snapshot.params['id'];

    if(id) {
      this.jobsService.getJobById(id).subscribe({
        next: (response: JobModel) => {
          this.job = response;
          this.isEdit = true;
          this.buildForm();
        }
      })
    }
  }

  onSubmit() {
    if(!this.createForm.valid) {
      return;
    }

    const data = {...this.createForm.value};

    if(data.id) {
      this.jobsService.putJob(data).subscribe({
        next: () => {
          this.router.navigate(['/jobs']);
        }
      });
    }
    else {
      this.jobsService.postJob(data).subscribe({
        next: () => {
          this.router.navigate(['jobs']);
        }
      });
    }
  }

  private buildForm(): void {
    console.log(this.job)

    this.createForm = this.formBuilder.group({
      id: this.job.id,
      title: [this.job?.title, [Validators.required]],
      description: this.job?.description,
      type: this.job?.type,
      category: this.job?.category,
    });
  }
}
