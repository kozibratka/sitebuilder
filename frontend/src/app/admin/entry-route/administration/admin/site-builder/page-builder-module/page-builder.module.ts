import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../../../../../../core/core.module';
import {MenuBuilderComponent} from './page-builder/menu-builder/menu-builder.component';
import {PaletteBuilderComponent} from './page-builder/palette-builder/palette-builder.component';
import {DragScrollDirective} from './page-builder/palette-builder/tools/directives/drag-scroll-directive';
import {PageBlockComponent} from './page-builder/palette-builder/page-block/page-block.component';
import {MenuPluginResolverDirective} from './page-builder/menu-builder/tools/directives/menu-plugin-resolver.directive';
import {PaletteItemComponent} from './page-builder/palette-builder/page-block/palette-item-component/palette-item.component';
import {PaletteItemQuickMenuComponent} from './page-builder/palette-builder/palette-item-quick-menu/palette-item-quick-menu.component';



@NgModule({
  declarations: [
    PageBuilderComponent,
    MenuBuilderComponent,
    PaletteBuilderComponent,
    DragScrollDirective,
    PageBlockComponent,
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
