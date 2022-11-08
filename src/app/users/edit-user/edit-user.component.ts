import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { JobsService } from 'src/app/shared/services/jobs.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  user!: UserModel;
  userId!: string;

  constructor(private fb: FormBuilder,
     private userService: UserService,
     private router: Router,
     private jobsService: JobsService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;

    if(this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (response: UserModel) => {
          this.user = response;

          this.editForm = this.fb.group({
            username: [this.user.username, Validators.required],
            email: [this.user.email, Validators.required],
            password: [this.user.password, Validators.required],
          });
        }
      });
    }
  }

  onSubmit() {
    if(!this.editForm.valid) {
      return;
    }

    const data = {...this.editForm.value};

    if(this.user.username === data.username &&
      this.user.email === data.email &&
      this.user.password === data.password) {
        return;
    }

    this.user.username = data.username;
    this.user.email = data.email;
    this.user.password = data.password;

    this.userService.updateUser(this.user).subscribe({
      next: () => {
        alert('Successfully updated user!');
        this.router.navigate(['']);
      }
    });
  }

  deleteAccount() {

    if(this.user.role === 'Company') {
      this.jobsService.getAllJobs().subscribe(response => {
        let companyJobs = response.filter(j => j.companyId === this.user.id);

        companyJobs.forEach(job => {
          this.jobsService.delete(job.id).subscribe({});
        });

        this.userService.deleteUser(this.userId).subscribe({
          next: () => {
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            this.router.navigate(['/login']);
            alert('Successfully delete account!');
          }
        });
      });
    } else {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          localStorage.removeItem('role');
          localStorage.removeItem('userId');
          this.router.navigate(['/login']);
          alert('Successfully delete account!');
        }
      });
    }
  }

}
