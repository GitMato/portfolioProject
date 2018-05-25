import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  //title: string = 'About';

  formProgress: number = 1;
  testBool: boolean = true;


  constructor(private route: ActivatedRoute, private router: Router) {
    //this.route.params.subscribe(res => console.log(res.id));

    //this.formHide();
    

   }

  ngOnInit() {
  }

  sendMeHome() {
    this.router.navigate(['projects']);
  }

  checkForm(value){


    return value == this.formProgress;
  }

  nextFormSection (){

    if (this.formProgress < 3){
      this.formProgress += 1;
    }
    console.log(this.formProgress);
  }

  previousFormSection(){
    if (this.formProgress > 1){
      this.formProgress -= 1;
    }
    console.log(this.formProgress);
  }
}

