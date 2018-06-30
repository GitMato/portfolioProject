import { Component, OnInit } from '@angular/core';

import { Project, Tool } from '../project';
import { ProjectService } from '../project.service';

import { ActivatedRoute, Router } from '@angular/router';
// The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.
import { Location } from '@angular/common';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss']
})
export class ProjectdetailComponent implements OnInit {

  project: Project;

  //projects: Project[];
  projectId: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private router: Router ) { }

  

  ngOnInit(): void {

    //this.id = +this.route.snapshot.paramMap.get('id');
    //this.getProjects();
    this.getProject();
    //this.project = this.projects[this.id-1];
    //this.projects = [];
  }

  // getProjects(): void {
  //   this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
  // }


  
  getProject(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    console.log("id: " + this.projectId);
    //console.log(typeof(id));
    this.projectService.getProject(this.projectId).subscribe(project => this.project = project);
    //console.log(this.project.id, this.project.name);
    console.log(this.project);
  }


  // from button
  modifyThisProject() {
    this.router.navigate(['/modify/project/'+this.projectId]);
  }

}
