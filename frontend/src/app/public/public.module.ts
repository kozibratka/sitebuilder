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
    PublicPageBlockComponent
  ],
  imports: [
    CommonModule,
    AppAdminModule,
    RouterModule.forRoot(routes),
    PageModule,
  ],
  bootstrap: [AppPublicComponent]
})
export class PublicModule { }
