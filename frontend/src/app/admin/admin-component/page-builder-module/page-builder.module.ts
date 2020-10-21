import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder-component/page-builder.component';
import { MenuBuilderComponent } from './page-builder-component/menu-builder-component/menu-builder.component';
import { PaletteBuilderComponent } from './page-builder-component/palette-builder-component/palette-builder.component';
import {SortablejsModule} from 'ngx-sortablejs';
import { DragScrollDirective } from './page-builder-component/palette-builder-component/tools/directives/drag-scroll-directive';
import { PaletteBlockComponent } from './page-builder-component/palette-builder-component/palette-block-component/palette-block.component';
import { MenuPluginResolverDirective } from './page-builder-component/menu-builder-component/tools/directives/menu-plugin-resolver.directive';
import { PaletteItemComponent } from './page-builder-component/palette-builder-component/palette-block-component/palette-item-component/palette-item.component';
import { PaletteItemQuickMenuComponent } from './page-builder-component/palette-builder-component/palette-item-quick-menu-component/palette-item-quick-menu.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../../../core/core.module';



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
