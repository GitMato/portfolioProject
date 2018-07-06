import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-view-child2',
  templateUrl: './test-view-child2.component.html',
  styleUrls: ['./test-view-child2.component.scss']
})
export class TestViewChild2Component implements OnInit {

  @Input() counter: number;


  constructor() { }

  ngOnInit() {
  }


}
