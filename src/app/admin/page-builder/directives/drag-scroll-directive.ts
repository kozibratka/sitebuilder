import {Directive, ElementRef, HostListener, NgZone} from '@angular/core';

@Directive({
  selector: '[appSmartPageScroll]'
})
export class DragScrollDirective {

  constructor(private window: Window, private element: ElementRef, private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.element.nativeElement.addEventListener('drag', this.doScroll.bind(this));
    });
  }

  private doScroll(): void{
    console.log("hejbu");
  }

}
