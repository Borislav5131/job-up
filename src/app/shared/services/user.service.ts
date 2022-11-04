import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users';

  constructor(private httpClient : HttpClient) { }

  getUserById(userId: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.url}/${userId}`);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.url}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<UserModel> {
    return this.httpClient.delete<UserModel>(`${this.url}/${userId}`);
  }
}
