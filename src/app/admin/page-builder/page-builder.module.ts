import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { PaletteBuilderComponent } from './palette-builder/palette-builder.component';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import {SortablejsModule} from 'ngx-sortablejs';



@NgModule({
  declarations: [PageBuilderComponent, MenuBuilderComponent, PaletteBuilderComponent],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    SortablejsModule
  ],
  exports: [PageBuilderComponent]
})
export class PageBuilderModule { }
