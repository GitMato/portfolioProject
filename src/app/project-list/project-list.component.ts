import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//import {MatCardModule} from '@angular/material/card';
//import { PROJECTS } from '../ProjectEntries';
import { Project } from '../project';
import { ProjectService } from '../project.service';

// Animations
import {trigger, style, transition, animate, keyframes, query, stagger, state, animateChild} from '@angular/animations';
import { DataStorageService } from '../data-storage.service';
import { Subscription } from '../../../node_modules/rxjs';


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
      // transition(':leave', [
      //   animate(200, style({transform: 'translateX(100%'}))
      // ])
      ]),

      //Jotta animoinnit ei tulisi yhtäaikaa EI TOIMI ATM - optianal true lisätty toistaiseksi
      trigger('list', [
        transition(':enter', [
          query('@projectTrigger', stagger(100, animateChild({delay: 100})), {optional: true})
        ])
      ])
    ]
})

export class ProjectListComponent implements OnInit, OnDestroy {
  
  projects: Project[] = [];
  allProjectsSub: Subscription;
  
  constructor(//private route: ActivatedRoute, 
              private router: Router, 
              //private projectService: ProjectService,
              private dataStorageService: DataStorageService) {
    //this.route.params.subscribe(res => console.log(res.id));

    this.allProjectsSub = this.dataStorageService.allProjectsObs
      .subscribe(
        allprojects => 
        {
          this.projects = allprojects;
        }, 
        error => 
          console.log(error)
    );

   }

  async ngOnInit() {
    //this.getProjects();
    //if (this.projectService.allProjects.length == 0){
    //  await this.projectService.updateAllProjectsVar();
    //}

    if (this.projects.length == 0){
      await this.dataStorageService.updateProjects();
    }
  }

  goToProject() {
    this.router.navigate(['projects']);
  }

  // getProjects (): void {
  //   this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
  // }

  ngOnDestroy(){
    this.allProjectsSub.unsubscribe();
  }

}


