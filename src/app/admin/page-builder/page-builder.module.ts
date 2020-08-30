import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { MenuBuilderComponent } from './page-builder/menu-builder/menu-builder.component';
import { PaletteBuilderComponent } from './page-builder/palette-builder/palette-builder.component';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import {SortablejsModule} from 'ngx-sortablejs';
import { DragScrollDirective } from './page-builder/palette-builder/directives/drag-scroll-directive';
import { PaletteBlockComponent } from './page-builder/palette-builder/palette-block/palette-block.component';
import {TestSliderComponent} from '../../plugins/test-slider/test-slider.component';
import { MenuPluginResolverDirective } from './page-builder/menu-builder/directives/menu-plugin-resolver.directive';
import { PaletteBlockGridstackItemDirective } from './page-builder/palette-builder/palette-block/directives/palette-block-gridstack-item.directive';



@NgModule({
  declarations: [PageBuilderComponent, MenuBuilderComponent, PaletteBuilderComponent, DragScrollDirective, PaletteBlockComponent, TestSliderComponent, MenuPluginResolverDirective, PaletteBlockGridstackItemDirective],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    SortablejsModule
  ],
  exports: [PageBuilderComponent],
  providers: [{provide: Window, useValue: window}]
})
export class PageBuilderModule { }
