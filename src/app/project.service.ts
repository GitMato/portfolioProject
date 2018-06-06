import { Injectable } from '@angular/core';

import { PROJECTS } from './ProjectEntries';

import { Observable, of } from 'rxjs';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProjects(): Observable <Project[]>  {

    return of(PROJECTS);
  }

  getProject(id: number): Observable<Project> {
    return of(PROJECTS.find(project => project.id === id));
  }

}
