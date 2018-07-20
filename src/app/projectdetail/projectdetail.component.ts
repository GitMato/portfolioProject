import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';

import { Project, Tool } from '../project';
import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
// The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../data-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss'],
  providers: []
})
export class ProjectdetailComponent implements OnInit {


  project: Project;

  //projects: Project[];
  projectId: number;

  allTools: Tool[] = [];
  toolsUsed: Tool[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    //private toolService: ToolService,
    //private location: Location,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private dataStorageService: DataStorageService ) {
      this.dataStorageService.allToolsObs
        .subscribe( 
          value => {
            this.allTools = value;
            //this.dataStorageService.updateTools();
          },
      error => console.log(error) );


    }

  

  async ngOnInit(): Promise<void> {

    //this.getAllTools().then(() => this.getProject());

    if (this.allTools.length == 0){
      await this.initTools();
      console.log("allTools.length == 0");
    } else {
    await this.getProject();
    }
  }

  async initTools(){
    //await this.toolService.updateAllToolsVar();

    await this.dataStorageService.updateTools();
    await this.getProject();
    //await this.dataStorageService.updateTools();
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

  // async getAllTools(){
  //   await this.toolService.getAllTools().subscribe(result => this.toolsAvailable = result,
  //                                           error => console.log(error), () => {} );
  // }


  findToolsForProject(checkAmount: number = 5) {
    let tool: Tool;
    for (let toolId of this.project.tools){
      tool = this.allTools.find(x => x.id == toolId);
      if (tool != undefined){
        console.log(tool.name + tool.id);
        this.toolsUsed.push(tool);
      } else {
        console.log("Undefined tool exists in this project.")
      }
    }
    
    // if (this.allTools.length == 0 && checkAmount > 0){
    //   setTimeout(() => this.findToolsForProject(checkAmount - 1), 100);
    //   console.log("meni looppiin")
    // }

    //console.log("alltools: " + this.allTools + ". " +this.toolsUsed);
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
                                        () => { 
                                                //this.projectService.updateAllProjectsVar();
                                                this.dataStorageService.updateProjects();
                                                this.router.navigate(['/projects/']);
                                                console.log("The project has been deleted.");}
                                        );
      //this.router.navigate(['/projects/']);
    }
    //this.projectService.deleteProject(this.projectId);
    //this.router.navigate(['/projects/']);
  }  
    openDialog(url: string): void{
  
      const dialogRef = this.dialog.open(ImageDialogComponent, { maxWidth: '90%', maxHeight: '90%', data: {url: url}});
    }
}
