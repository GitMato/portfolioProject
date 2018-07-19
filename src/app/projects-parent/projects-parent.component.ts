import { Component, OnInit } from '@angular/core';
import { ToolService } from '../tool.service';
import { ProjectService } from '../project.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-projects-parent',
  templateUrl: './projects-parent.component.html',
  styleUrls: ['./projects-parent.component.scss'],
  //providers: [ToolService, ProjectService],
  providers: [DataStorageService],
})
export class ProjectsParentComponent implements OnInit {

  constructor(//private toolService: ToolService,
              //private projectService: ProjectService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

}
