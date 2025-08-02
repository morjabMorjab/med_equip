import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Directive({
  selector: '[appSwiper]',
  standalone: true
})
export class SwiperDirective implements OnInit, OnDestroy {
  private swiper: Swiper | undefined;
  
  @Input() config?: any;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.swiper = new Swiper(this.element.nativeElement, {
      modules: [Navigation, Pagination, Autoplay],
      ...this.config
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy();
  }
}
