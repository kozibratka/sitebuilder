import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppAdminModule} from '../app-admin.module';
import { PublicComponent } from './pages/public/public.component';
import {RouterModule, Routes} from '@angular/router';
import {AppPublicComponent} from './app-public.component';
import {PageResolver} from './services/page.resolver';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    resolve: {page: PageResolver},
  }
];
@NgModule({
  declarations: [
    PublicComponent,
    AppPublicComponent
  ],
    imports: [
        CommonModule,
        AppAdminModule,
        RouterModule
    ],
  bootstrap: [AppPublicComponent]
})
export class PublicModule { }
