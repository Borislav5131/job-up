import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('userId');

    if(userId) {
      this.userService.getUserById(userId).subscribe({
        next: (response: User) => {
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

}
