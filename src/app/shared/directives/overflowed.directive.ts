import { Directive, ElementRef, Output, Input, EventEmitter, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[wrapOverflowed]'
})
export class OverflowedDirective implements OnDestroy {
  @Input() 
  targetWrap: ElementRef | null = null;
  @Input() 
  set start(val: boolean) {
    this.tryEmitEvent();
  };
  @Output() 
  wrapped: EventEmitter<void> = new EventEmitter<void>();
  @Output() 
  unWrapped: EventEmitter<void> = new EventEmitter<void>();
  private windowResizeSubscription: Subscription | null = null;
  private unWrappingWidth: number = 0;

  constructor() {
    // add appropriate throttle
    this.windowResizeSubscription = fromEvent(window, "resize").pipe().subscribe(this.tryEmitEvent.bind(this));
  }

  ngOnDestroy() {
    this.windowResizeSubscription?.unsubscribe();
  }

  private tryEmitEvent() {
    if (!this.unWrappingWidth && this.targetWrap?.nativeElement.children.length) {
      const children = this.targetWrap.nativeElement.children;
      const base = children[0].offsetTop;
      if (Array.prototype.some.call(children, function (element) { return base !== element.offsetTop; })) {
        this.unWrappingWidth = window.innerWidth + children[children.length - 1].offsetWidth;
        this.wrapped.emit();
      }
      return;
    }
    // unwrap event emitted if current width allows to render full container
    if (this.unWrappingWidth && this.unWrappingWidth < window.innerWidth) {
      this.unWrappingWidth = 0;
      this.unWrapped.emit();
    }
}

}

export interface IWrapOverflowed {
  onItemsHorizontallyWrapped: (width: number) => void;
  element: ElementRef; 
}
