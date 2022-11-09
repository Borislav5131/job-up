import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username : string = '';
  email : string = '';
  password : string = '';
  role: string = '';

  roles: string[] = [
    'User',
    'Company',
  ];

  constructor(private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  signup() {
    if(this.username === '' || this.email === '' || this.password === '' || this.role === '') {
      alert("All fields are required!");
      return;
    }

    const data: UserModel = {
      id: '',
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      jobPositions: [],
    }

    this.authService.signUp(data).subscribe({
      next: (res: UserModel) => {
        if(res == null) {
          alert("Registration failed");
          this.ngOnInit();
        } else {
          console.log("Registration successful");
          alert("Registration successful");
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
