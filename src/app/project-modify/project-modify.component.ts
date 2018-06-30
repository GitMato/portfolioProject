import { Component, OnInit } from '@angular/core';
import { Url } from 'url';

import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

import { ActivatedRoute } from '@angular/router';

import { Project, Tool } from '../project';

//import {MatTabsModule} from '@angular/material/tabs';

//form
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

// interface ProjectInterface{
//   name: string;
//   url: Url;
//   Alt: string;
//   Tools: Tool[];
//   description: string;
//   details: string;
//   extraImg: Url[];
// }

// interface Tool{
//   name: string;
// }


@Component({
  selector: 'app-project-modify',
  templateUrl: './project-modify.component.html',
  styleUrls: ['./project-modify.component.scss']
})

export class ProjectModifyComponent implements OnInit {

  //ProjectForm
  // projectForm = new FormGroup({
  //   name: new FormControl()
  // });

  //name = new FormControl();

  // Messages for user
  toolMessage: string;
  projectAddToolMessage: string;
  projectMessage: string;

  // Form for tool
  toolForm: FormGroup;

  usableTools: Tool[];

  selectedTool: string;
  toolsInProject: Tool[];
  toolIdsInProject: number[];

  // for selecting which project to modify
  //selectedProject: number;
  //projects: Project[];

  // Form for project
  projectForm: FormGroup;

  // //ToolForm
  // toolForm = new FormGroup({
  //   toolName: new FormControl()
  // });

  // for project modifying
  projectId: number;
  isModify: boolean;
  projectToModify: Project;

  constructor(private toolfb: FormBuilder,
              private projectfb: FormBuilder,
              private projectService: ProjectService,
              private toolService: ToolService,
              private route: ActivatedRoute) { 
    this.toolsInProject = [];
    this.toolIdsInProject = [];
    //this.projectToModify = {name: null, id: null, imgUrl: null, imgAlt: null, description: null, details: null, tools: [], extraimg:null};
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

  ngOnInit() {
    //this.usableTools = this.toolService.getAllTools();
    this.getToolsFromDb();
    this.checkProjectModify();
    
  }

  addNewProject(){
    this.projectService.insertProject(this.projectForm.value);
    // TODO: if 200 -> reset
    //this.projectForm.reset();
  }

  // add a new tool to the db
  addNewTool(){
    this.toolMessage = "New tool added."
    this.toolService.insertTool(this.toolForm.value.name);
    this.toolForm.reset();
  }

  // get all tools from the db
  getToolsFromDb(){
    this.toolService.getAllTools().subscribe(usableTools => this.usableTools = usableTools);
  }

  addToolToProject(){
    if (this.toolsInProject.find(y => y.name == this.selectedTool)){
      this.projectAddToolMessage = "You've already added that tool!"
      return;
    }
    var tool = this.usableTools.find(x => x.name == this.selectedTool);
    this.toolsInProject.push(tool);
    this.toolIdsInProject.push(tool.id);
    this.projectAddToolMessage = "";
    //console.log(this.toolsInProject);
  }

  checkProjectModify() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    console.log("id: "+this.projectId);
    if (this.projectId){
      this.isModify = true;
      //this.projectService.getProject(this.projectId).subscribe(x => this.projectToModify = x, error => console.log(error));

      this.projectService.getProject(this.projectId).subscribe(project => this.projectToModify = project);
      //let projectJson = this.projectService.getProject(this.projectId).subscribe(x => projectJson = x);

      //this.projectToModify = JSON.parse(projectJson);
      console.log(this.projectToModify);
    }

  }

}
