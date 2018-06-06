import { Component, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';

import { ActivatedRoute } from '@angular/router';
// The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.
import { Location } from '@angular/common';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.scss']
})
export class ProjectdetailComponent implements OnInit {

  project: Project;

  projects: Project[];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location ) { }

  

  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProjects();
    //this.getProject();
    this.project = this.projects[this.id-1];
    this.projects = [];
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }


  // EI TOIMI?! MIKSEI
  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    console.log(typeof(id));
    this.projectService.getProject(id).subscribe(project => this.project = project)
    console.log(this.project.id, this.project.name)
  }

}
