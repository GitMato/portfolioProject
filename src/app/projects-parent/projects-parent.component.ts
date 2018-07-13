import { Component, OnInit } from '@angular/core';
import { ToolService } from '../tool.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects-parent',
  templateUrl: './projects-parent.component.html',
  styleUrls: ['./projects-parent.component.scss'],
  providers: [ToolService, ProjectService]
})
export class ProjectsParentComponent implements OnInit {

  constructor(private toolService: ToolService,
              private projectService: ProjectService) { }

  ngOnInit() {
  }

}
