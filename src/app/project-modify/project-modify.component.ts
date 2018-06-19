import { Component, OnInit } from '@angular/core';
import { Url } from 'url';

import { ProjectService } from '../project.service';
import { ToolService } from '../tool.service';

//form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  message: string;

  toolForm: FormGroup;

  usableTools: Tool[];

  

  // //ToolForm
  // toolForm = new FormGroup({
  //   toolName: new FormControl()
  // });

  constructor(private toolfb: FormBuilder,
              private projectService: ProjectService,
              private toolService: ToolService) { 
    this.createForm();
  }

  createForm(){
    this.toolForm = this.toolfb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    //this.usableTools = this.toolService.getAllTools();
    this.getToolsFromDb();
  }

  addNewProject(){
    // TODO
    //asp.nettiin http post
  }

  // add a new tool to the db
  addNewTool(){
    this.message = "New tool added."
    //console.log(this.toolForm.value);
    this.toolService.insertTool(this.toolForm.value.name);
    this.toolForm.reset();
    
    
  }

  // get all tools from the db
  getToolsFromDb(){
    this.toolService.getAllTools().subscribe(usableTools => this.usableTools = usableTools);
  }

}
