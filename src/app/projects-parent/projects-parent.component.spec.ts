import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsParentComponent } from './projects-parent.component';

describe('ProjectsParentComponent', () => {
  let component: ProjectsParentComponent;
  let fixture: ComponentFixture<ProjectsParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
