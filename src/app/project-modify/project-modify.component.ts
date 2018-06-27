import { Component, OnInit } from '@angular/core';
import { Url } from 'url';

import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

//import {MatTabsModule} from '@angular/material/tabs';

//form
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

interface ProjectInterface{
  name: string;
  url: Url;
  Alt: string;
  Tools: Tool[];
  description: string;
  details: string;
  extraImg: Url[];
}

interface Tool{
  name: string;
}


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

  toolMessage: string;
  projectMessage: string;

  toolForm: FormGroup;

  usableTools: Tool[];

  selectedTool: string;
  toolsInProject: Tool[];

  //toolIdsInProject: number[];

  //projectForm
  projectForm: FormGroup;

  // //ToolForm
  // toolForm = new FormGroup({
  //   toolName: new FormControl()
  // });

  constructor(private toolfb: FormBuilder,
              private projectfb: FormBuilder,
              private projectService: ProjectService,
              private toolService: ToolService) { 
    this.toolsInProject = [];
    this.createForms();
  }

  createForms(){
    this.toolForm = this.toolfb.group({
      name: ['', Validators.required],
    });

    this.projectForm = this.projectfb.group({
      name: ['', Validators.required],
      imgUrl: [''],
      imgAlt: [''],
      description: ['', Validators.required],
      tools: [this.toolsInProject],
      details: [''],
      extraimg: [''],

    });
  }

  ngOnInit() {
    //this.usableTools = this.toolService.getAllTools();
    this.getToolsFromDb();
  }

  addNewProject(){
    // TODO
    //asp.nettiin http post

    //this.projectService.insertProject(this.projectForm.value);
    //this.projectForm.reset();
    console.log(this.projectForm.value);
  }

  // add a new tool to the db
  addNewTool(){
    this.toolMessage = "New tool added."
    //console.log(this.toolForm.value);
    this.toolService.insertTool(this.toolForm.value.name);
    //console.log(this.toolForm.value);
    this.toolForm.reset();
    
    
  }

  // get all tools from the db
  getToolsFromDb(){
    this.toolService.getAllTools().subscribe(usableTools => this.usableTools = usableTools);
  }

  addToolToProject(){
    if (this.toolsInProject.find(y => y.name == this.selectedTool)){
      this.projectMessage = "You've already added that tool!"
      return;
    }
    var tool = this.usableTools.find(x => x.name == this.selectedTool);
    this.toolsInProject.push(tool);
    this.projectMessage = "";
    console.log(this.toolsInProject);
  }

}
