import { Injectable } from '@angular/core';

import { PROJECTS } from './ProjectEntries';

import { Observable, of } from 'rxjs';

import { Project } from './project';

import { HttpClient } from '@angular/common/http';

// export interface Project{
//     id: number;
//     name: string;
//     imgUrl: string;
//     imgAlt: string;
//     description: string;
// }


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable <Project[]>  {

    return of(PROJECTS);
  }

  getProject(id: number): Observable<Project> {
    return of(PROJECTS.find(project => project.id === id));
  }


  // uutta, nodejs
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/api/projects');
  }

  getCat(id: number): Observable<Project> {
    return this.http.get<Project>('http://localhost:3000/api/projects' + id);
  }

  insertProject(project: Project): Observable<Project> {
    return this.http.post<Project>('http://localhost:3000/api/projects', project);
  }

  updateProject(project: Project): Observable<void> {
    return this.http.put<void>('http://localhost:3000/api/projects' + project.name, project);
  }

  deleteProject(id: number) {
    return this.http.delete('http://localhost:3000/api/projects' + id);
  }

  // uutta, asp.net
  getAllProjectsC(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:5000/api/projects');
  }

}
