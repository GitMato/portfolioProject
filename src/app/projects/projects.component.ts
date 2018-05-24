import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(res => console.log(res.id));

   }

  ngOnInit() {

  }

  goToProject() {
    this.router.navigate(['projects']);
  }

}
