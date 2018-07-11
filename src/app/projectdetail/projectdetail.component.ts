import { Component, OnInit, AfterContentInit } from '@angular/core';

import { Project, Tool } from '../project';
import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
// The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss']
})
export class ProjectdetailComponent implements OnInit {


  project: Project;

  //projects: Project[];
  projectId: number;
  toolsAvailable: Tool[] = [];
  toolsUsed: Tool[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toolService: ToolService,
    private location: Location,
    private router: Router,
    private authService: AuthService ) {
    }

  

  ngOnInit(): void {

    //this.id = +this.route.snapshot.paramMap.get('id');
    //this.getProjects();
    this.getAllTools().then(() => this.getProject());
    //this.getProject();
    //this.project = this.projects[this.id-1];
    //this.projects = [];
    //this.getToolsForProject();
  }

  // getProjects(): void {
  //   this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
  // }


  
  getProject(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    console.log("Project id from address: " + this.projectId);
    //console.log(typeof(id));
    this.projectService.getProject(this.projectId).subscribe(project => this.project = project,
                                                            error => console.log(error),
                                                            () => this.findToolsForProject()
                                                            );
    //console.log(this.project.id, this.project.name);
    //console.log(this.project);
  }

  async getAllTools(){
    await this.toolService.getAllTools().subscribe(result => this.toolsAvailable = result,
                                            error => console.log(error), () => {} );
  }


  findToolsForProject() {
    let tool: Tool;
    for (let toolId of this.project.tools){
      tool = this.toolsAvailable.find(x => x.id == toolId);
      if (tool != undefined){
        console.log(tool.name + tool.id);
        this.toolsUsed.push(tool);
      }
    }
  }


  // from button
  modifyThisProject() {
    this.router.navigate(['/modify/project/'+this.projectId]);
  }

  deleteThisProject() {
    //alert();
    if (confirm("Do you really want to delete this project?")){
      this.projectService.deleteProject(this.projectId).subscribe(()=>{},
                                        error => (console.log(error)), 
                                        () => { this.router.navigate(['/projects/'])
                                                console.log("The project has been deleted.")}
                                        );
      //this.router.navigate(['/projects/']);
    }
    //this.projectService.deleteProject(this.projectId);
    //this.router.navigate(['/projects/']);
  }

}
