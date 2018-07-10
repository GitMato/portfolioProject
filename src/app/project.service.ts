import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Project } from './project';

import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface jsonProject {
  project: Project;
}



@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectAPIURL = "http://localhost:5000/api/projects/"; 

  // tämä sama project servicessa sekä toolservicessä
  headers = new HttpHeaders().set('Content-Type', 'application/json')
                            .append('Authorization', "Bearer " + localStorage.getItem('auth_token')
                            .substring(1, localStorage.getItem('auth_token').length-1)
                          );


  constructor(private http: HttpClient) { }


  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectAPIURL + id);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectAPIURL);
  }

  // HttpPost - add project to database
  insertProject(project: Project): Observable<void> {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log(JSON.stringify(project));
    return this.http.post<void>(this.projectAPIURL, JSON.stringify(project), { headers: this.headers });
    
  }

  // insertProject(project: Project): any {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   console.log(JSON.stringify(project));
  //   this.http.post(this.projectAPIURL, JSON.stringify(project), { headers: headers }).subscribe();
    
  // }

  updateProject(project: Project): Observable<void> {
    return this.http.put<void>(this.projectAPIURL + project.id, JSON.stringify(project), {headers: this.headers});
  }

  deleteProject(id: number) {
    return this.http.delete(this.projectAPIURL + id, { headers: this.headers});
  }

}
