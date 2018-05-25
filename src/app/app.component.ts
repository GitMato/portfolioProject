import { Component } from '@angular/core';

//test
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  // Set the title
  public constructor(private titleService: Title ) { }
 
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
