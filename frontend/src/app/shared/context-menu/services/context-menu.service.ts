import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {MatMenu} from '@angular/material/menu';
import {ContextMenuComponent} from '../components/context-menu/context-menu.component';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  menuRef: ComponentRef<ContextMenuComponent> = null;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  showMenu(mouseEvent: MouseEvent, matMenu: MatMenu, containerRef: ViewContainerRef) {
    this.menuRef = containerRef.createComponent<ContextMenuComponent>(this.resolver.resolveComponentFactory(ContextMenuComponent));
    this.menuRef.instance.menu = matMenu;
    this.menuRef.changeDetectorRef.detectChanges();
    this.menuRef.instance.showMenu({x: mouseEvent.x, y: mouseEvent.y}, () => {this.menuRef.destroy(); this.menuRef = null; });
  }
}
