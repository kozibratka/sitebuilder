import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { MenuBuilderComponent } from './page-builder/menu-builder/menu-builder.component';
import { PaletteBuilderComponent } from './page-builder/palette-builder/palette-builder.component';
import {SortablejsModule} from 'ngx-sortablejs';
import { DragScrollDirective } from './page-builder/palette-builder/tools/directives/drag-scroll-directive';
import { PaletteBlockComponent } from './page-builder/palette-builder/palette-block/palette-block.component';
import { MenuPluginResolverDirective } from './page-builder/menu-builder/tools/directives/menu-plugin-resolver.directive';
import { PaletteItemComponent } from './page-builder/palette-builder/palette-block/palette-item/palette-item.component';
import { PaletteItemQuickMenuComponent } from './page-builder/palette-builder/palette-item-quick-menu/palette-item-quick-menu.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../../core/core.module';



@NgModule({
  declarations: [
    PageBuilderComponent,
    MenuBuilderComponent,
    PaletteBuilderComponent,
    DragScrollDirective,
    PaletteBlockComponent,
    MenuPluginResolverDirective,
    PaletteItemComponent,
    PaletteItemQuickMenuComponent
  ],
  imports: [
    CommonModule,
    SortablejsModule,
    RouterModule,
    CoreModule
  ],
  exports: [PageBuilderComponent],
  providers: [{provide: Window, useValue: window}]
})
export class PageBuilderModule { }
