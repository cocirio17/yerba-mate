import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({ selector: '[appScrollReveal]', standalone: false })
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'scroll-reveal');
    if (typeof IntersectionObserver === 'undefined') { this.renderer.addClass(this.element.nativeElement, 'is-visible'); return; }
    this.observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { this.renderer.addClass(this.element.nativeElement, 'is-visible'); this.observer?.unobserve(entry.target); }
    }), { threshold: .12 });
    this.observer.observe(this.element.nativeElement);
  }
  ngOnDestroy(): void { this.observer?.disconnect(); }
}
