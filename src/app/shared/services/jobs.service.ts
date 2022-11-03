import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { JobModel } from '../models/job.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  url = 'http://localhost:3000/jobs';

  constructor(private httpClient: HttpClient) { }

  //create
  postJob(data: JobModel): Observable<JobModel> {
    data.id = UUID.UUID();
    data.likes = [];

    return this.httpClient.post<JobModel>(this.url, data);
  }

  getAllJobs(): Observable<JobModel[]> {
    return this.httpClient.get<JobModel[]>(this.url);
  }

  getJobById(id: string): Observable<JobModel> {
    return this.httpClient.get<JobModel>(`${this.url}/${id}`);
  }

  putJob(model: JobModel): Observable<JobModel> {
    return this.httpClient.put<JobModel>(`${this.url}/${model.id}`, model);
  }

  delete(id: string): Observable<undefined> {
    return this.httpClient.delete<undefined>(`${this.url}/${id}`);
  }
}
