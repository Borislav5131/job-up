import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/users';

  constructor(private httpClient : HttpClient) { }

  signUp(data : UserModel): Observable<UserModel> {
    data.id = UUID.UUID();

    return this.httpClient.post<UserModel>(this.url, data);
  }

  login(username: string, password: string): Observable<UserModel | null> {
    return this.httpClient.get<UserModel[]>(this.url).pipe(
      map((response: UserModel[]) => {
        const user = response.find(u => u.username === username && u.password === password);

        if(user) {
          return user;
        }

        return null;
      })
    );
  }
}
