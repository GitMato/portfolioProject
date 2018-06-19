import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { LoginComponent } from './login/login.component';
import { ProjectModifyComponent } from './project-modify/project-modify.component';

//testing
import {TestViewComponent} from './test-view/test-view.component';


const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent,

  },
  {
    path: 'projects/:id',
    component: ProjectdetailComponent,

  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'modify',
    component: ProjectModifyComponent,
  },
  {
    path: 'modify/:id',
    component: ProjectModifyComponent,
  },
  // testi
  {
    path: 'testview',
    component: TestViewComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
