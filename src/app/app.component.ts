import { Component } from '@angular/core';

//test
import { Title }     from '@angular/platform-browser';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  // Set the title
  public constructor(private titleService: Title,
                     private authService: AuthService ) { }
 
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  logOut(){
    this.authService.isLoggedIn = false;
    localStorage.removeItem('auth_token');
  }

}
