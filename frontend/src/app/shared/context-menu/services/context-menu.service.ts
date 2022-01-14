import {ElementRef, Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {fromEvent, Subscription} from 'rxjs';
import {SelectedMenuItemInterface} from '../interfaces/selected-menu-item-interface';
import {ContextMenuRootDirective} from '../directives/context-menu-root.directive';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  overlayRef: {overlayRef: OverlayRef, menu: ContextMenuRootDirective}[] = [];
  sub: Subscription;

  constructor(
    public overlay: Overlay,
  ) {
  }

  open(selectedMenuItemInterface: SelectedMenuItemInterface, close = false) {
    if (close) {
      this.close();
    }
    let target: {x, y} | ElementRef;
    if (!selectedMenuItemInterface.currentMenu) {
      const mouseEvent = selectedMenuItemInterface.targetElement as MouseEvent;
      target = {x: mouseEvent.x, y: mouseEvent.y};
    } else {
      target = selectedMenuItemInterface.targetElement as ElementRef;
    }
    if (selectedMenuItemInterface.currentMenu) {
      const findedMenuInTree = _.find(this.overlayRef, {menu: selectedMenuItemInterface.currentMenu});
      if (findedMenuInTree) {
        const index = this.overlayRef.indexOf(findedMenuInTree);
        if ((this.overlayRef[index + 1] && this.overlayRef[index + 1].menu !== selectedMenuItemInterface.subMenu)
          || !this.overlayRef[index + 1]) {
          const toDispose = this.overlayRef.slice(index + 1);
          toDispose.forEach(value => {
            value.overlayRef.dispose();
          });
          this.overlayRef = _.dropRight(this.overlayRef, toDispose.length);
        } else if (this.overlayRef[index + 1].menu === selectedMenuItemInterface.subMenu) {
          return;
        }
      }
    }
    if (selectedMenuItemInterface.currentMenu && !selectedMenuItemInterface.subMenu) {
      return;
    }
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(target)
      .withPositions([
        selectedMenuItemInterface.subMenu ? {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
          } :
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        }
      ])
    ;
    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    overlayRef.attach(new TemplatePortal(selectedMenuItemInterface.subMenu.templateRef, selectedMenuItemInterface.containerRef, {
      $implicit: {}
    }));
    this.overlayRef.push({overlayRef, menu: selectedMenuItemInterface.subMenu});

    if (!selectedMenuItemInterface.currentMenu) {
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
        value.overlayRef.dispose();
      });
      this.overlayRef = [];
    }
  }
}
