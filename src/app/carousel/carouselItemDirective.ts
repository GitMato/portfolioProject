import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[carouselItem]'
  })
  export class CarouselItemDirective {
  
    constructor( public tpl : TemplateRef<any> ) {
    }
  
  }

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement  {


}