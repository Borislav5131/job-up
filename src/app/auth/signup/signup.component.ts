import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
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

    const data: User = {
      id: '',
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
    }

    this.authService.signUp(data).subscribe(res => {
      if(res == null) {
        alert("Registration failed");
        this.ngOnInit();
      }else {
        console.log("Registration successful");
        alert("Registration successful");
        this.router.navigate(['/login']);
      }
    }, err => {
      alert("Registration failed.");
      this.ngOnInit();
    });
  }
}
