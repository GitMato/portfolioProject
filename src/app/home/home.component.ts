import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //title: string = 'Home';

  ItemCount: number;
  btnText: string = 'Add the item';
  goalText: string = 'My first item';

  goals = [];

  constructor() { }

  ngOnInit() {
    this.ItemCount = this.goals.length;
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.ItemCount = this.goals.length;


  }

}
