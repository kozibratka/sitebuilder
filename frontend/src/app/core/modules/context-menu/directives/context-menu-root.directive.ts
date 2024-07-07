import {Directive, ElementRef, HostBinding, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {ContextMenuService} from '../services/context-menu.service';
import {ContextMenuItemDirective} from './context-menu-item.directive';

@Directive({
  selector: '[appContextMenuRoot]',
  standalone: true,
  exportAs: 'contextMenuRootDirective'
})
export class ContextMenuRootDirective implements OnInit{

  @Input()level: number;
  selectedItem$ = new Subject<{subMenu: ContextMenuRootDirective, target: ElementRef}>();
  menuItemClear$ = new Subject<ElementRef>();

  constructor(
    public templateRef: TemplateRef<any>,
    private contextMenuService: ContextMenuService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.selectedItem$.subscribe(value => {
      this.menuItemClear$.next(value.target);
      this.contextMenuService.open({currentMenu: this, subMenu: value.subMenu,
          targetElement: value.target, containerRef: this.viewContainerRef});
    });
  }

}
