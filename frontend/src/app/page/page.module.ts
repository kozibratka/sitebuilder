import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageListComponent} from './pages/page-list/page-list.component';
import {PageCreateComponent} from './pages/page-create/page-create.component';
import {PageDetailResolverService} from './services/page-detail-resolver.service';
import {PageBuilderComponent} from './pages/page-builder/page-builder.component';
import {PageBuilderResolverService} from './services/page-builder-resolver.service';
import {PageBlockComponent} from './components/page-block/page-block/page-block.component';
import {RemovePageDialogComponent} from './components/remove-page-dialog/remove-page-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MenuBuilderComponent} from './components/menu-builder/menu-builder.component';
import {PaletteBuilderComponent} from './components/palette-builder/palette-builder.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {SortablejsModule} from 'ngx-sortablejs';
import {GenericResolver} from '../core/services/resolver/generic.resolver';
import {CoreModule} from '../core/core.module';
import {PaletteItemQuickMenuComponent} from './components/palette-builder/palette-item-quick-menu/palette-item-quick-menu.component';
import {MenuPluginResolverDirective} from './directives/menu-plugin-resolver.directive';
import {PaletteItemComponent} from './components/palette-builder/page-block/palette-item-component/palette-item.component';
import { PluginMiniAdminComponent } from './pages/page-builder/components/plugin-mini-admin/plugin-mini-admin.component';
import {MatIconModule} from '@angular/material/icon';
import {MouseMoveScrollDirective} from '../core/directives/mouse-move-scroll-directive';
import { RemoveGridItemDialogComponent } from './components/remove-grid-item-dialog/remove-grid-item-dialog.component';
import {FormBuilderModule} from '../core/modules/form-builder/form-builder.module';
import { GridRowComponent } from './components/grid-row/grid-row.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';
import { GridCellItemComponent } from './components/grid-cell-item/grid-cell-item.component';
import { MenuNewRowComponent } from './components/./menu-new-row/menu-new-row.component';
import {MatMenuModule} from "@angular/material/menu";


const routes: Routes = [
  {
    path: 'list',
    component: PageListComponent,
    // resolve: {pageList: PageListResolverService},
    resolve: {pageList: GenericResolver},
    data: {resolverConfig: {data: {route: 'page_list'}, queryDataMap: {webId: 'id'}}},
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'update/:pageId',
    component: PageCreateComponent,
    resolve: {pageDetail: PageDetailResolverService},
  },
  {
    path: 'create',
    component: PageCreateComponent
  },
  {
    path: 'page-builder/:pageId',
    component: PageBuilderComponent,
    resolve: {pageDetail: PageBuilderResolverService},
    data: {withGlobalPlugins: true},
  }
];
@NgModule({
  declarations: [
    PageCreateComponent,
    PageListComponent,
    PageBuilderComponent,
    PageBlockComponent,
    RemovePageDialogComponent,
    MenuBuilderComponent,
    PaletteBuilderComponent,
    PaletteItemComponent,
    PaletteItemQuickMenuComponent,
    MouseMoveScrollDirective,
    MenuPluginResolverDirective,
    PluginMiniAdminComponent,
    RemoveGridItemDialogComponent,
    GridRowComponent,
    GridCellComponent,
    GridCellItemComponent,
    MenuNewRowComponent,
  ],
  exports: [
    PaletteItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    SortablejsModule,
    MatIconModule,
    FormBuilderModule,
    MatMenuModule,
  ]
})
export class PageModule { }
