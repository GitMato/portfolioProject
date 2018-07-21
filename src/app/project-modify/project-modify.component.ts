import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Project, Tool } from '../project';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-project-modify',
  templateUrl: './project-modify.component.html',
  styleUrls: ['./project-modify.component.scss'],
})

export class ProjectModifyComponent implements OnInit, OnDestroy {

  // messages for notification
  alertMessage: string;
  successMessage: string;
  

  // Message for trying to add already existing tool into the project
  projectAddToolMessage: string;

  // Form for tool
  toolForm: FormGroup;

  allTools: Tool[] = [];
  allToolsSub: Subscription;

  selectedTool: string;
  toolsInProject: Tool[] = [];
  toolIdsInProject: number[] = [];

  extraImages: string[] = [];
  extraUrls: string[] = [];

  // Form for project
  projectForm: FormGroup;

  // for project modifying
  isModify: boolean;
  projectToModify: Project;

  // for tool modifying
  toolToModify: Tool;

  constructor(private toolfb: FormBuilder,
              private projectfb: FormBuilder,
              private projectService: ProjectService,
              private toolService: ToolService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService) { 
    //this.toolsInProject = [];
    //this.toolIdsInProject = [];
    this.allToolsSub = this.dataStorageService.allToolsObs.subscribe( value => { this.allTools = value; });

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
      extraimg: [this.extraImages],
      extraUrls: [this.extraUrls]

    });
  }

  async ngOnInit() {
    //this.usableTools = this.toolService.getAllTools();
    //this.getToolsFromDb();
    //this.toolService.updateAllToolsVar();

    this.checkProjectModify();

    // if (this.toolService.allTools.length == 0){
    //   await this.toolService.updateAllToolsVar();
    // }

    if (this.allTools.length == 0){
      await this.dataStorageService.updateTools();
    }
    
  }

  async addNewProject(){
    console.log(this.projectForm.value);
    await this.projectService.insertProject(this.projectForm.value).subscribe(() => {},
                                                                        error => console.log(error), 
                                                                        () => {
                                                                          //console.log("New project created!");
                                                                          //this.projectService.updateAllProjectsVar();
                                                                          this.dataStorageService.updateProjects();
                                                                          this.successMessage = "New project created!";
                                                                          this.projectForm.reset();
                                                                          this.resetFieldsInProject();
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
                                                                      //this.toolService.updateAllToolsVar();
                                                                      this.dataStorageService.updateTools();
                                                                      this.toolForm.reset();
                                                                      });
  }

  resetFieldsInProject(){
    // tools
    this.toolsInProject = [];
    this.toolIdsInProject = [];
    this.selectedTool = "";

    // extra images
    this.extraImages = [];

    //extra urls
    this.extraUrls = [];
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
    //let tool = this.toolService.allTools.find(x => x.name == this.selectedTool);
    let tool = this.allTools.find(x => x.name == this.selectedTool);
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
    // set the tools from existing project.
    // toolsInProject visible to user, toolIdsInProject is sent to backend.
    // project.tools contains Tool -class objects (backend tools contains only ids).
    
    for (let toolId of project.tools){
      console.log(toolId);
      this.toolIdsInProject.push(toolId);

      //let tool: Tool = this.toolService.allTools.find(y => y.id == toolId);
      let tool: Tool = this.allTools.find(y => y.id == toolId);
      if (tool != undefined){
        this.toolsInProject.push(tool);
      }
    }

    for (let extraimage of project.extraimg){
      this.extraImages.push(extraimage);
    }

    for (let extraurl of project.extraUrls){
      this.extraUrls.push(extraurl);
    }

    this.projectForm.patchValue({
      name: project.name,
      imgUrl: project.imgUrl,
      imgAlt: project.imgAlt,
      description: project.description,
      tools: this.toolIdsInProject,
      details: project.details,
      extraimg: this.extraImages,
      extraUrls: this.extraUrls
      });

  }

  // Update existing project in the db and navigate to the updated project
  updateExistingProject(){
    this.projectService.updateProject(this.projectToModify.id, this.projectForm.value)
      .subscribe(() => {},
                error => console.log(error), 
                () => {
                  this.dataStorageService.updateProjects();
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
                                                                    //this.toolService.updateAllToolsVar();
                                                                    this.successMessage = "The tool has been updated!"
                                                                    this.dataStorageService.updateTools();
                                                                  }
                                                                  );
  }

  resetToolForm(){
    this.toolForm.reset();
    this.toolToModify = null;
  }

  addExtraImg(input: string){
    // check if input is not empty and if the same string doesn't exist yet
    if(input && !this.extraImages.find(x => x == input)){
      this.extraImages.push(input);
    }
  }

  removeExtraImg(index: number){

    if (index > -1){
      this.extraImages.splice(index, 1);
    }
  }

  addExtraUrl(input: string){
    // check if input is not empty and if the same string doesn't exist yet
    if(input && !this.extraUrls.find(x => x == input)){
      this.extraUrls.push(input);
    }
  }

  removeExtraUrl(index: number){

    if (index > -1){
      this.extraUrls.splice(index, 1);
    }
  }
  
  ngOnDestroy(){
    this.allToolsSub.unsubscribe();
  }

}
