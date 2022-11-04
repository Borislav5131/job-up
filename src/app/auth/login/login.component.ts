import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
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
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        const user = res;

        if(user) {
          console.log("Login successful");
          this.router.navigate(['']);
          localStorage.setItem('role', user.role);
          localStorage.setItem('userId', user.id);
        } else {
          alert("Username or password is wrong");
          this.ngOnInit();
        }
      }
    });
  }
}
