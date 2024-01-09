import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppAdminModule} from '../app-admin.module';
import { PublicComponent } from './pages/public/public.component';
import {RouterModule, Routes} from '@angular/router';
import {AppPublicComponent} from './app-public.component';
import {PageResolver} from './services/page.resolver';
import {PageModule} from '../page/page.module';
import {PublicGridItemComponent} from './components/public-grid-item/public-grid-item.component';
import { PublicPageBlockComponent } from './components/public-page-block/public-page-block.component';
import { GridCellPublicComponent } from './components/grid-cell-public/grid-cell-public.component';
import {CoreModule} from "../core/core.module";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { GridCellItemPublicComponent } from './components/grid-cell-item-public/grid-cell-item-public.component';
import { GridRowPublicComponent } from './components/grid-row-public/grid-row-public.component';

const routes: Routes = [
  {
    path: '**',
    component: PublicComponent,
    resolve: {pageDetail: PageResolver},
  }
];
@NgModule({
  declarations: [
    PublicComponent,
    AppPublicComponent,
    PublicGridItemComponent,
    PublicPageBlockComponent,
    GridCellPublicComponent,
    GridCellItemPublicComponent,
    GridRowPublicComponent
  ],
    imports: [
        CommonModule,
        AppAdminModule,
        RouterModule.forRoot(routes),
        PageModule,
        CoreModule,
        MatIconModule,
        MatMenuModule,
    ],
  bootstrap: [AppPublicComponent]
})
export class PublicModule { }
