import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { PaletteBuilderComponent } from './palette-builder/palette-builder.component';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import {SortablejsModule} from 'ngx-sortablejs';
import { SmartPageScrollDirective } from './directives/smart-page-scroll.directive';



@NgModule({
  declarations: [PageBuilderComponent, MenuBuilderComponent, PaletteBuilderComponent, SmartPageScrollDirective],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    SortablejsModule
  ],
  exports: [PageBuilderComponent],
  providers: [{provide: Window, useValue: window}]
})
export class PageBuilderModule { }
