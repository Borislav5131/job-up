import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users';

  constructor(private httpClient : HttpClient) { }

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/${userId}`);
  }
}
