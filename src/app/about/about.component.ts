import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { formatDate, getLocaleDateFormat, getLocaleId } from '@angular/common';
//import { NullTemplateVisitor } from '@angular/compiler';

// vähä ku timeout
//import { interval } from 'rxjs';


// Animations
import {trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [

    // unused animation atm, prob going to scrap this
    trigger('formnameTrigger', [
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
      animate(200)
      ]), 
        
      transition('* => void', [
        animate(200, style({transform: 'translateX(-100%'}))
      ])
      ])
    ]
})
export class AboutComponent implements OnInit {

  //title: string = 'About';

  formProgress: number = 1;

  formDate: string = "Your name";
  formName: string;
  formEmail: string;
  formMessage: string;
  //formNeljas: string;
  
  nextBtnValue: string = "Next";

  today = Date.now();
  //today1 = Date.now();

  //private secondInterval = interval(1000);

  constructor(
              private route: ActivatedRoute, 
              private router: Router) {
    //this.route.params.subscribe(res => console.log(res.id));

   }
  

  ngOnInit() {

    // formDate should be saved only when submitting the form, this is just for testing
    // formatDate(value: string | number | Date, format: string, locale: string, timezone?: string): string
    this.formDate = formatDate(Date.now(), "HH:mm dd.MM.y", 'fi');

    

  }


  // from tutorial
  sendMeHome() {
    this.router.navigate(['projects']);
  }

  checkForm(value: number){
    return value == this.formProgress;
  }

  checkFormProgress(value: number){
    return value > this.formProgress;
  }

  nextFormSection (){
    if (this.formProgress < 4){
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

  disableButton(){
    this.changeBtnText();
    if (this.formProgress == 1 && !this.formName){
      return false;
    } else if (this.formProgress == 2 && !this.formEmail){
      return true;
    } else if (this.formProgress == 3 && !this.formName){
      return true;
    } else if (this.formProgress == 4 && !this.formMessage){
      this.changeBtnText();
      return true;
      
    } else {
      return false;
    }
  }

  changeBtnText(){
    if (this.formProgress == 4){
      this.nextBtnValue = "Submit";
    } else {
      this.nextBtnValue = "Next";
    }
  }

}

