import { Injectable } from '@angular/core';

import { PROJECTS } from './ProjectEntries';

import { Observable, of } from 'rxjs';

import { Project } from './project';

import { HttpClient, HttpHeaders } from '@angular/common/http';


// Tool interface is in multiple places, FIX
export interface Tool{
  name: string;
  id: number;
}

// Project interface is in multiple places, FIX
export interface ProjectInter{
    name: string;
    imgUrl: string;
    imgAlt: string;
    description: string;
    details: string;
    tools: Tool[];
    extraimg: string[];

}

export interface jsonProject {
  project: ProjectInter;
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectAPIURL = "http://localhost:5000/api/projects"; 

  constructor(private http: HttpClient) { }

  getProjects(): Observable <Project[]>  {

    return of(PROJECTS);
  }

  getProject(id: number): Observable<Project> {
    return of(PROJECTS.find(project => project.id === id));
  }


  // uutta, nodejs
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectAPIURL);
  }

  getCat(id: number): Observable<Project> {
    return this.http.get<Project>('http://localhost:3000/api/projects' + id);
  }

  // HttpPost - add project to database
  insertProject(project: ProjectInter): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log(project);
    this.http.post(this.projectAPIURL, JSON.stringify(project), { headers: headers }).subscribe(x=>{});
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
