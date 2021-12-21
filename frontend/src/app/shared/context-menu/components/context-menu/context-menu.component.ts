import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';
import {fromEvent, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {

  overlayRef: OverlayRef | null;
  clickOutsideContextMenuSubscription: Subscription;

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) { }

  openContextMenu(mouseEvent: MouseEvent, menuTemplate: TemplateRef<any>) {
    this.closeContextMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: mouseEvent.x, y: mouseEvent.y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(menuTemplate, this.viewContainerRef));
    this.clickOutsideContextMenuSubscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeContextMenu());
  }

  closeContextMenu() {
    if (this.clickOutsideContextMenuSubscription) {
      this.clickOutsideContextMenuSubscription.unsubscribe();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

}
