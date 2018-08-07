import { Component, OnInit, AfterViewInit, ContentChildren, QueryList, ElementRef, ViewChildren, ViewChild, Input, OnDestroy, Output } from '@angular/core';

// structural directive
import { CarouselItemDirective, CarouselItemElement } from './carouselItemDirective';
import { Project } from '../project';

import { ProjectService } from '../project.service';

import { AnimationPlayer, AnimationBuilder, AnimationFactory, animate, style } from '@angular/animations';

import { interval, TimeInterval, Observable, Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnInit, OnDestroy {

  @Output() alertMessage: string;

  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;

  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  carouselWrapperStyle = {};
  carouselItemStyle = {};

  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  //@Input() showControls = true;
  private player : AnimationPlayer;
  private itemWidth : number = 400;
  private currentSlide: number = 0;

  projects: Project[];

  private carouselInterval = interval(5000);

  private intervalSubscription: Subscription;
  private dataStorageServiceSub: Subscription;
  

  constructor(//private projectService: ProjectService, 
              private builder : AnimationBuilder,
              private dataStorageService: DataStorageService) 
              { 
                this.dataStorageServiceSub = this.dataStorageService.allProjectsObs
                  .subscribe(
                    allProjects => 
                    {
                      this.projects = allProjects;
                      if (this.intervalSubscription == null){
                        this.intervalSubscription = this.carouselInterval.subscribe(() => this.next());
                      }
                    },
                    () => console.log("Error loading projects.")
                );

                if (this.projects.length == 0){
                  this.dataStorageService.updateProjects();
                }
                
              }

  ngOnInit() {
    //this.projectService.getAllProjects().subscribe(projects => this.projects = projects);
    
    // if (this.projectService.allProjects.length == 0){
    //   await this.projectService.updateAllProjectsVar();
    // }

    // if (this.projects.length == 0){
    //   await this.dataStorageService.updateProjects();
    // }
    
    this.carouselItemStyle = {
      width: `${this.itemWidth}px`, height: `${this.itemWidth}px`
     }
    this.carouselWrapperStyle = {
    width: `${this.itemWidth}px`, height: `${this.itemWidth}px`
    }

    // this.carouselInterval.subscribe(n =>
    //   console.log(`It's been ${n} seconds since subscribing!`));

    //if(this.projects.length != 0){
    //  this.intervalSubscription = this.carouselInterval.subscribe(() => this.next());
    //}
    
    //this.interval = Observable.interval(1000).subscribe();

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

  nextButton(){
    this.intervalSubscription.unsubscribe();
    this.next();
    this.intervalSubscription = this.carouselInterval.subscribe(() => this.next());
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

  prevButton(){
    this.intervalSubscription.unsubscribe();
    this.prev();
    this.intervalSubscription = this.carouselInterval.subscribe(() => this.next());
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

   goToSlide(index: number){

    // unsubscribe so the interval wont trigger the next() -method
    this.intervalSubscription.unsubscribe();

    this.currentSlide = (index % this.projects.length);
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation : AnimationFactory = this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();

    // subscripbe back to interval so the timer has been reset
    this.intervalSubscription = this.carouselInterval.subscribe(() => this.next());
   }

   ngOnDestroy(){
    if (this.intervalSubscription != null){
      this.intervalSubscription.unsubscribe();
    }
    this.dataStorageServiceSub.unsubscribe();

    
   }
}
