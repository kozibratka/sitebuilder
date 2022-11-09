import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuRootDirective } from './directives/context-menu-root.directive';
import { ContextMenuItemDirective } from './directives/context-menu-item.directive';

@NgModule({
    declarations: [
        ContextMenuRootDirective,
        ContextMenuItemDirective
    ],
  exports: [
    ContextMenuRootDirective,
    ContextMenuItemDirective
  ],
    imports: [
        CommonModule
    ]
})
export class ContextMenuModule { }
