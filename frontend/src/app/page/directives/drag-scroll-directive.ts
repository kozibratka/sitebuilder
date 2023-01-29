import {Directive, ElementRef, NgZone} from '@angular/core';

enum SpeedScroll {
  low = 1,
  medium = 2,
  high = 3,
  disabled = 0
}

@Directive({
  selector: '[appSmartPageScroll]'
})
export class DragScrollDirective {
  private interval: number;
  private actualSpeed: SpeedScroll = SpeedScroll.disabled;

  constructor(private window: Window, private element: ElementRef, private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.element.nativeElement.addEventListener('drag', this.doScroll.bind(this));
      this.window.addEventListener('dragend', this.unregisterScrollInterval.bind(this));
    });
  }

  private doScroll(event: DragEvent): void {
    const mouseY = event.clientY.valueOf();
    const windowY = this.window.innerHeight;
    const positionDown = windowY - mouseY;


    if (mouseY < 20 && mouseY > 0) {
      if (this.actualSpeed !== SpeedScroll.high) {
        this.actualSpeed = SpeedScroll.high;
        this.registerScrollInterval(true);
      }
    } else if (mouseY < 60 && mouseY > 0) {
      if (this.actualSpeed !== SpeedScroll.medium) {
        this.actualSpeed = SpeedScroll.medium;
        this.registerScrollInterval(true);
      }
    } else if (mouseY < 120 && mouseY > 0) {
      if (this.actualSpeed !== SpeedScroll.low) {
        this.actualSpeed = SpeedScroll.low;
        this.registerScrollInterval(true);
      }
    }
    else if (positionDown < 20) {
      if (this.actualSpeed !== SpeedScroll.high) {
        this.actualSpeed = SpeedScroll.high;
        this.registerScrollInterval();
      }
    } else if (positionDown < 60) {
      if (this.actualSpeed !== SpeedScroll.medium) {
        this.actualSpeed = SpeedScroll.medium;
        this.registerScrollInterval();
      }
    } else if (positionDown < 120) {
      if (this.actualSpeed !== SpeedScroll.low) {
        this.actualSpeed = SpeedScroll.low;
        this.registerScrollInterval();
      }
    } else {
      this.unregisterScrollInterval();
    }
  }

  private registerScrollInterval(top = false): void {
    if (top) {
      this.actualSpeed = -this.actualSpeed;
    }
    this.unregisterScrollInterval(false);
    this.zone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.window.scrollBy({left: 0, top: this.actualSpeed});
      }, 5);
    });
  }

  private unregisterScrollInterval(clearSpeed: boolean = true): void {
    if (this.actualSpeed !== SpeedScroll.disabled) {
      clearTimeout(this.interval);
      if (clearSpeed) {
        this.actualSpeed = SpeedScroll.disabled;
      }
    }
  }

}
