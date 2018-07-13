import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//import {MatCardModule} from '@angular/material/card';
//import { PROJECTS } from '../ProjectEntries';
import { Project } from '../project';
import { ProjectService } from '../project.service';

// Animations
import {trigger, style, transition, animate, keyframes, query, stagger, state, animateChild} from '@angular/animations';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [

    // Projekti on animoitu vasemmalta
    trigger('projectTrigger', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
      animate(200)
      ]), 
      
      // toistaiseksi käyttämätön
      transition(':leave', [
        animate(200, style({transform: 'translateX(100%'}))
      ])
      ]),

      // Jotta animoinnit ei tulisi yhtäaikaa EI TOIMI ATM - optianal true lisätty toistaiseksi
      trigger('list', [
        transition(':enter', [
          query('@projectTrigger', stagger(100, animateChild({delay: 100})), {optional: true})
        ])
      ])
    ]
})

export class ProjectListComponent implements OnInit {
  
  projects: Project[] = [];
  
  
  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) {
    //this.route.params.subscribe(res => console.log(res.id));
   }

  ngOnInit() {
    //this.getProjects();
    this.projectService.updateAllProjectsVar();
  }

  goToProject() {
    this.router.navigate(['projects']);
  }

  // getProjects (): void {
  //   this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
  // }

}


