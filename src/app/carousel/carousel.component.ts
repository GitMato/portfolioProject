import { Component, OnInit, AfterViewInit, ContentChildren, QueryList, ElementRef, ViewChildren, ViewChild, Input } from '@angular/core';

// structural directive
import { CarouselItemDirective, CarouselItemElement } from './carouselItemDirective';
import { Project } from '../project';

import { ProjectService } from '../project.service';

import { AnimationPlayer, AnimationBuilder, AnimationFactory, animate, style } from '@angular/animations';

import { interval, TimeInterval, Observable } from 'rxjs';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnInit {

  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;

  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  carouselWrapperStyle = {};
  carouselItemStyle = {};

  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  //@Input() showControls = true;
  private player : AnimationPlayer;
  private itemWidth : number = 500;
  private currentSlide: number = 0;

  projects: Project[];

  private carouselInterval = interval(5000);

  constructor(private projectService: ProjectService, private builder : AnimationBuilder) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
    
    this.carouselItemStyle = {
      width: `${this.itemWidth}px`, height: `${this.itemWidth}px`
     }
    this.carouselWrapperStyle = {
    width: `${this.itemWidth}px`, height: `${this.itemWidth}px`
    }

    // this.carouselInterval.subscribe(n =>
    //   console.log(`It's been ${n} seconds since subscribing!`));

    this.carouselInterval.subscribe(() => this.next());

  }

 

  ngAfterViewInit(){
    // this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    // this.carouselWrapperStyle = {
    //  width: `${this.itemWidth}px`, height: `${this.itemWidth}px`
    // }
  }

  isCurrentSlide(compareSlide: number){
    if (this.currentSlide == compareSlide){
      return true;
    }
    else {
      return false;
    }
  }


  // Interval should be reset or something everytime next() is called
  next() {
    
    //if( this.currentSlide + 1 === this.projects.length ) return;
    //if( this.currentSlide + 1 === this.items.length ) return;
    if( this.currentSlide + 1 === this.projects.length ){
      this.currentSlide = -1;
    }

    // this.items.length
    this.currentSlide = (this.currentSlide + 1) % this.projects.length;

    const offset = this.currentSlide * this.itemWidth;
    
    const myAnimation : AnimationFactory = this.builder.build([
       //animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
       animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }


  prev() {

    
    //if( this.currentSlide === 0 ) return;
    if( this.currentSlide === 0 ){
      this.currentSlide = this.projects.length;
    }
 
    //this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;

    this.currentSlide = ((this.currentSlide - 1) + this.projects.length) % this.projects.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation : AnimationFactory = this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
   }
}
