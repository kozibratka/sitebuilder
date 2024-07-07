import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ContextMenuRootDirective} from './context-menu-root.directive';
import {Subscription} from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appContextMenuItem]'
})
export class ContextMenuItemDirective implements OnInit, OnDestroy{

  @Input()subMenu?: ContextMenuRootDirective;
  @HostBinding('style.background') isMouseOver = 'none';
  mouseOverSubscription: Subscription = null;

  constructor(
    private contextMenuRootDirective: ContextMenuRootDirective,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.mouseOverSubscription = this.contextMenuRootDirective.menuItemClear$.subscribe(value => {
      this.isMouseOver = value === this.elementRef ? '#eee' : 'none';
    });
  }

  ngOnDestroy() {
    this.mouseOverSubscription.unsubscribe();
  }

  @HostListener('mouseover')
  mouseOver() {
    this.contextMenuRootDirective.selectedItem$.next({subMenu: this.subMenu, target: this.elementRef});
  }

}
