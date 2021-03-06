import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { LoginComponent } from './Auth/login/login.component';
import { ProjectModifyComponent } from './project-modify/project-modify.component';
import { ProjectsParentComponent } from './projects-parent/projects-parent.component';

//testing
import {TestViewComponent} from './test-view/test-view.component';
import { RegisterComponent } from './Auth/register/register.component';

//AuthGuard
import { AuthGuard } from './auth-guard.service';



const routes: Routes = [

  {
    path: '',
    component: ProjectsParentComponent,
    children: [
      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
      {
        path: 'home', 
        component: HomeComponent
      },
      {
        path: 'projects',
        component: ProjectListComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectdetailComponent,
    
      },
      {
        path: 'modify',
        component: ProjectModifyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'modify/project/:id',
        component: ProjectModifyComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // testi
  // {
  //   path: 'testview',
  //   component: TestViewComponent,
  // },
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
