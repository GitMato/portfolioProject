import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-view-child',
  templateUrl: './test-view-child.component.html',
  styleUrls: ['./test-view-child.component.scss']
})
export class TestViewChildComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter<number>();

  counter: number = 0;
  constructor() { }

  ngOnInit() {
  }

  TriggerEvent(){
    this.counter += 1;
    this.buttonClicked.emit(this.counter);
    //debugger;
  }
}
