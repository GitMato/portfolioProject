import { Component, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {



  projects: Project[];


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjectsC().subscribe(projects => this.projects = projects);

  }

}
