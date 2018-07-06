import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {

  //@Output() eventClicked = new EventEmitter<Event>();
  public childOneCounter: number;

  //projects: Project[];


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    //this.projectService.getAllProjects().subscribe(projects => this.projects = projects);

  }

  childButtonClicked(counter: number){
    this.childOneCounter = counter;
  }
}
