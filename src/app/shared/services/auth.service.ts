import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/users';

  constructor(private httpClient : HttpClient) { }

  signUp(data : User): Observable<User> {
    data.id = UUID.UUID();

    return this.httpClient.post<any>(this.url, data);
  }

  login(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
}
