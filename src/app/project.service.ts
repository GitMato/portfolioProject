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

  allProjects: Project[] = [];

  projectAPIURL = "http://localhost:5000/api/projects/"; 

  // tämä sama project servicessa sekä toolservicessä
  // headers = new HttpHeaders().set('Content-Type', 'application/json')
  //                           .append('Authorization', "Bearer " + localStorage.getItem('auth_token')
  //                           .substring(1, localStorage.getItem('auth_token').length-1)
  //                         );
  //headers = 
  headers: HttpHeaders;


  constructor(private http: HttpClient) { 
    this.updateHeader();
  }


  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectAPIURL + id);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectAPIURL);
  }

  // HttpPost - add project to database
  insertProject(project: Project): Observable<void> {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.updateHeader();
    console.log(JSON.stringify(project));
    return this.http.post<void>(this.projectAPIURL, JSON.stringify(project), { headers: this.headers });
    
  }

  // insertProject(project: Project): any {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   console.log(JSON.stringify(project));
  //   this.http.post(this.projectAPIURL, JSON.stringify(project), { headers: headers }).subscribe();
    
  // }

  updateProject(id: number, project: Project): Observable<void> {
    this.updateHeader();
    return this.http.put<void>(this.projectAPIURL + id, JSON.stringify(project), {headers: this.headers});
  }

  deleteProject(id: number) {
    this.updateHeader();
    return this.http.delete(this.projectAPIURL + id, { headers: this.headers});
  }

  updateHeader(): void{

    if (localStorage.getItem('auth_token')){
      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                              .append('Authorization', "Bearer " + localStorage.getItem('auth_token')
                              .substring(1, localStorage.getItem('auth_token').length-1)
      )
    } 
    else {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }
    
  }

  async updateAllProjectsVar(){
    // this.getAllProjects().subscribe(response => this.allProjects = response, 
    //                                 error => console.log(error));

    this.allProjects = await this.getAllProjects().toPromise();
  }

}
