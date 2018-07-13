import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';

import { HttpClientModule } from '@angular/common/http';

// Locales
import { registerLocaleData } from '@angular/common';
import localeFi from '@angular/common/locales/fi';

// Material modules
import {MatCardModule, 
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        MatTabsModule,
        MatListModule,
        MatButtonModule } from '@angular/material';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { TestViewComponent } from './test-view/test-view.component';
import { ProjectModifyComponent } from './project-modify/project-modify.component';
import { TestViewChildComponent } from './test-view-child/test-view-child.component';
import { TestViewChild2Component } from './test-view-child2/test-view-child2.component';
import { ProjectsParentComponent } from './projects-parent/projects-parent.component';





registerLocaleData(localeFi, 'fi');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectListComponent,
    ProjectdetailComponent,
    PagenotfoundComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    TestViewComponent,
    ProjectModifyComponent,
    TestViewChildComponent,
    TestViewChild2Component,
    RegisterComponent,
    ProjectsParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, //
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
