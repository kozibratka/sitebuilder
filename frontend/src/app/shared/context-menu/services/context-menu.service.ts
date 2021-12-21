import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {MatMenu} from '@angular/material/menu';
import {ContextMenuV2Component} from '../components/context-menu-v2/context-menu-v2.component';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  menuRef: ComponentRef<ContextMenuV2Component> = null;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  showMenu(mouseEvent: MouseEvent, matMenu: MatMenu, containerRef: ViewContainerRef) {
    this.menuRef = containerRef.createComponent<ContextMenuV2Component>(this.resolver.resolveComponentFactory(ContextMenuV2Component));
    this.menuRef.instance.menu = matMenu;
    this.menuRef.changeDetectorRef.detectChanges();
    this.menuRef.instance.showMenu({x: mouseEvent.x, y: mouseEvent.y}, () => {this.menuRef.destroy(); this.menuRef = null; });
  }
}
