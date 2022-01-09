import {ContextMenuRootDirective} from '../directives/context-menu-root.directive';
import {ElementRef, ViewContainerRef} from '@angular/core';

export interface SelectedMenuItemInterface {
  currentMenu?: ContextMenuRootDirective;
  subMenu?: ContextMenuRootDirective;
  containerRef?: ViewContainerRef;
  targetElement?: MouseEvent | ElementRef;
}
