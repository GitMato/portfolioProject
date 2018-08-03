import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../node_modules/rxjs';

import { Tool, Project } from './project';
import { ToolService } from './tool.service';
import { ProjectService } from './project.service';



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  allTools = new BehaviorSubject<Tool[]>([]);
  allToolsObs = this.allTools.asObservable();

  allProjects = new BehaviorSubject<Project[]>([]);
  allProjectsObs = this.allProjects.asObservable();

  constructor(private toolService: ToolService,
              private projectService: ProjectService) { }

  async updateTools(){
    await this.toolService.getAllTools().toPromise().then( newToolList => this.allTools.next(newToolList), () => console.log("Error in getting tools from API.") );

      // this.toolService.getAllTools()
      // .subscribe( 
      //   newToolList => 
      //   {
      //     this.allTools.next(newToolList);
      //   },
      //   error =>
      //   {
      //     console.log(error);
      //   }
      // );

    //this.allTools.next( this.toolService.getAllTools().toPromise() );
    
  }

  async updateProjects(){

    await this.projectService.getAllProjects().toPromise().then ( newProjectList => this.allProjects.next(newProjectList), () => console.log("Error in getting projects from API.") );
    
    // await this.projectService.getAllProjects()
    //   .subscribe( 
    //     newProjectList => 
    //     { 
    //       this.allProjects.next( newProjectList );
    //       console.log(newProjectList);
    //     },
    //     error => 
    //     {
    //       console.log(error);
    //     }
    //   );
  }
}
