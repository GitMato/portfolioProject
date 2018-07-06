import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestViewChild2Component } from './test-view-child2.component';

describe('TestViewChild2Component', () => {
  let component: TestViewChild2Component;
  let fixture: ComponentFixture<TestViewChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestViewChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestViewChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
