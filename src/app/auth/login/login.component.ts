import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string = "";
  password : string = "";

  constructor(private authService: AuthService,
    private router: Router) {
   }

  ngOnInit(): void {
  }

  login() {
    const data: User = {
      id: '',
      username: this.username,
      email: '',
      password: this.password,
      role: '',
    }

    this.authService.login().subscribe(res => {
      const user = res.filter(u => u.username === data.username && u.password === data.password);

      if(user.length === 1) {
        console.log("Login successful");
        this.router.navigate(['']);
        localStorage.setItem('role', user[0].role);
      } else {
        alert("Username or password is wrong");
        this.ngOnInit();
      }
    }, err => {
      alert("Login failed");
      this.ngOnInit();
    })
  }
}
