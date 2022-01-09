import {Directive, ElementRef, HostListener, Input, TemplateRef} from '@angular/core';
import {ContextMenuRootDirective} from './context-menu-root.directive';

@Directive({
  selector: '[appContextMenuItem]'
})
export class ContextMenuItemDirective {

  @Input()subMenu?: ContextMenuRootDirective;

  constructor(
    private contextMenuRootDirective: ContextMenuRootDirective,
    private elementRef: ElementRef
  ) {
  }

  @HostListener('mouseover')
  mouseOver() {
    this.contextMenuRootDirective.selectedItem$.next({subMenu: this.subMenu, target: this.elementRef});
  }

}
