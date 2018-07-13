import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Project, Tool } from '../project';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-modify',
  templateUrl: './project-modify.component.html',
  styleUrls: ['./project-modify.component.scss'],
})

export class ProjectModifyComponent implements OnInit {

  // messages for notification
  alertMessage: string;
  successMessage: string;
  

  // Message for trying to add already existing tool into the project
  projectAddToolMessage: string;

  // Form for tool
  toolForm: FormGroup;

  //usableTools: Tool[] = [];

  selectedTool: string;
  toolsInProject: Tool[] = [];
  toolIdsInProject: number[] = [];

  // Form for project
  projectForm: FormGroup;

  // for project modifying
  isModify: boolean;
  projectToModify: Project;
  toolToModify: Tool;

  constructor(private toolfb: FormBuilder,
              private projectfb: FormBuilder,
              private projectService: ProjectService,
              private toolService: ToolService,
              private route: ActivatedRoute,
              private router: Router) { 
    //this.toolsInProject = [];
    //this.toolIdsInProject = [];

    this.createForms();
  }

  createForms(){
    this.toolForm = this.toolfb.group({
      name: ['', Validators.required],
    });


    // todo url validator
    this.projectForm = this.projectfb.group({
      name: ['', Validators.required],
      imgUrl: [''],
      imgAlt: [''],
      description: ['', Validators.required],
      tools: [this.toolIdsInProject],
      details: [''],
      extraimg: [''],

    });
  }

  async ngOnInit() {
    //this.usableTools = this.toolService.getAllTools();
    //this.getToolsFromDb();
    //this.toolService.updateAllToolsVar();

    this.checkProjectModify();

    if (this.toolService.allTools.length == 0){
      await this.toolService.updateAllToolsVar();
    }
    
  }

  async addNewProject(){
    await this.projectService.insertProject(this.projectForm.value).subscribe(() => {},
                                                                        error => console.log(error), 
                                                                        () => {
                                                                          //console.log("New project created!");
                                                                          this.projectService.updateAllProjectsVar();
                                                                          this.successMessage = "New project created!";
                                                                          this.projectForm.reset();
                                                                          this.resetToolsInProject();
                                                                          this.createForms();
                                                                          });
    
  }

  // add a new tool to the db
  async addNewTool(){
    //this.toolMessage = "New tool added."
    await this.toolService.insertTool(this.toolForm.value).subscribe(() => {},
                                                                    error => console.log(error), 
                                                                    () => {
                                                                      //this.getToolsFromDb();
                                                                      this.successMessage = "New tool created!"
                                                                      this.toolService.updateAllToolsVar();
                                                                      this.toolForm.reset();
                                                                      });
  }

  resetToolsInProject(){
    this.toolsInProject = [];
    this.toolIdsInProject = [];
    this.selectedTool = "";
  }

  // get all tools from the db
  // async getToolsFromDb(){
  //   await this.toolService.getAllTools().subscribe(usableTools => this.usableTools = usableTools, 
  //                                           error => console.log(error),
  //                                           () => {});
  // }

  addToolToProject(){
    if (this.toolsInProject.find(y => y.name == this.selectedTool)){
      this.projectAddToolMessage = "You've already added that tool!"
      return;
    }
    let tool = this.toolService.allTools.find(x => x.name == this.selectedTool);
    //let tool = this.usableTools.find(x => x.name == this.selectedTool);
    this.toolsInProject.push(tool);
    this.toolIdsInProject.push(tool.id);
    this.projectAddToolMessage = "";
    console.log(this.toolIdsInProject);
  }

  removeToolFromProject(tool: Tool){
    
    //find tool from ToolsInProject and ToolIdsInProject arrays
    let index:number = this.toolsInProject.indexOf(tool,0);

    // if index is found
    if (index > -1){
      this.toolsInProject.splice(index, 1);
      this.toolIdsInProject.splice(index, 1);
    }
  }

  async checkProjectModify() {
    let projectId: number = +this.route.snapshot.paramMap.get('id');
    console.log("id: "+projectId);
    if (projectId){
      this.isModify = true;
      //this.projectService.getProject(this.projectId).subscribe(x => this.projectToModify = x, error => console.log(error));

      // get project from db
      await this.projectService.getProject(projectId).subscribe(project => this.projectToModify = project,
                                                                error => console.log(error),
                                                                () => this.setProjectFormValues(this.projectToModify)
                                                                );

    }
  }

  setProjectFormValues(project: Project){
    //this.projectForm.setValue(this.projectToModify);
    
    // set the tools from existing project.
    // toolsInProject visible to user, toolIdsInProject is sent to backend.
    // project.tools contains Tool -class objects (backend tools contains only ids).
    

    for (let toolId of project.tools){
      console.log(toolId);
      this.toolIdsInProject.push(toolId);

      let tool: Tool = this.toolService.allTools.find(y => y.id == toolId);
      //let tool: Tool = this.usableTools.find(y => y.id == toolId);
      if (tool != undefined){
        this.toolsInProject.push(tool);
      }
    }

    this.projectForm.patchValue({
      name: project.name,
      imgUrl: project.imgUrl,
      imgAlt: project.imgAlt,
      description: project.description,
      tools: this.toolIdsInProject,
      details: project.details,
      extraimg: project.extraimg,
      });

      

    
  }

  // Update existing project in the db and navigate to the updated project
  updateExistingProject(){
    this.projectService.updateProject(this.projectToModify.id, this.projectForm.value)
    .subscribe(() => {},
              error => console.log(error), 
              () => {
                console.log("Project updated!");
                this.router.navigate(['/projects/'+this.projectToModify.id]);
                });
                                                                          
  }

  setToolFormValue(tool: Tool){
    this.toolToModify = tool;
    this.toolForm.patchValue({
      name: tool.name
      });
  }

  updateExistingTool(){
    this.toolService.updateTool(this.toolToModify.id, this.toolForm.value).subscribe(() => {},
                                                                  error => console.log(error), 
                                                                  () => {
                                                                    console.log("Tool updated!");
                                                                    //this.getToolsFromDb();
                                                                    this.toolService.updateAllToolsVar();
                                                                  }
                                                                  );
  }

  resetToolForm(){
    this.toolForm.reset();
    this.toolToModify = null;
  }
  

}
