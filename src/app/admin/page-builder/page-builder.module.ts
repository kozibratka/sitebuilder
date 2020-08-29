import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { MenuBuilderComponent } from './page-builder/menu-builder/menu-builder.component';
import { PaletteBuilderComponent } from './page-builder/palette-builder/palette-builder.component';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import {SortablejsModule} from 'ngx-sortablejs';
import { DragScrollDirective } from './page-builder/palette-builder/directives/drag-scroll-directive';
import { PaletteBlockComponent } from './page-builder/palette-builder/palette-block/palette-block.component';
import { GridstackModule } from '@libria/gridstack';
import {TestSliderComponent} from '../../plugins/test-slider/test-slider.component';
import { MenuPluginResolverDirective } from './page-builder/menu-builder/directives/menu-plugin-resolver.directive';



@NgModule({
  declarations: [PageBuilderComponent, MenuBuilderComponent, PaletteBuilderComponent, DragScrollDirective, PaletteBlockComponent, TestSliderComponent, MenuPluginResolverDirective],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    SortablejsModule,
    GridstackModule.forRoot()
  ],
  exports: [PageBuilderComponent],
  providers: [{provide: Window, useValue: window}]
})
export class PageBuilderModule { }
