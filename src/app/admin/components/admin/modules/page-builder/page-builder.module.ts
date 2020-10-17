import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './components/page-builder/page-builder.component';
import { MenuBuilderComponent } from './components/page-builder/menu-builder/menu-builder.component';
import { PaletteBuilderComponent } from './components/page-builder/palette-builder/palette-builder.component';
import {SortablejsModule} from 'ngx-sortablejs';
import { DragScrollDirective } from './components/page-builder/palette-builder/tools/directives/drag-scroll-directive';
import { PaletteBlockComponent } from './components/page-builder/palette-builder/components/palette-block/palette-block.component';
import { MenuPluginResolverDirective } from './components/page-builder/menu-builder/tools/directives/menu-plugin-resolver.directive';
import { PaletteItemComponent } from './components/page-builder/palette-builder/components/palette-block/components/palette-item/palette-item.component';
import { PaletteItemQuickMenuComponent } from './components/page-builder/palette-builder/components/palette-item-quick-menu/palette-item-quick-menu.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../../../../../core/core.module';



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
