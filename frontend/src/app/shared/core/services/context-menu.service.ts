import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {fromEvent, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  overlayRef: OverlayRef[] = [];
  sub: Subscription;

  constructor(
    public overlay: Overlay,
  ) {
  }

  open(target: MouseEvent, data, template: TemplateRef<any>, viewContainerRef: ViewContainerRef, isSubMenu = false) {
    if (!isSubMenu) {
      this.close();
    }
    const parentElement = isSubMenu ? target.target as HTMLElement : null;
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(!parentElement ? {x: target.x, y: target.y} : parentElement)
      .withPositions([
        parentElement ? {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'center',
          } :
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        }
      ])
    ;
    const templateRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    templateRef.attach(new TemplatePortal(template, viewContainerRef, {
      $implicit: data
    }));
    this.overlayRef.push(templateRef);

    if (!isSubMenu) {
      this.sub = fromEvent<MouseEvent>(document, 'click').subscribe(() => this.close());
    }
  }

  close() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
    if (this.overlayRef.length) {
      this.overlayRef.forEach(value => {
        value.dispose();
      });
      this.overlayRef = [];
    }
  }
}
