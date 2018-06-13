import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';

// Locales
import { registerLocaleData } from '@angular/common';
import localeFi from '@angular/common/locales/fi';

// Material modules
import {MatCardModule, 
        MatSelectModule,
        MatExpansionModule,
        MatInputModule} from '@angular/material';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';




registerLocaleData(localeFi, 'fi');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ProjectdetailComponent,
    PagenotfoundComponent,
    CarouselComponent,
    LoginComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
