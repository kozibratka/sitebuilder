import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppAdminModule} from '../app-admin.module';
import { PublicComponent } from './pages/public/public.component';
import {Routes} from '@angular/router';
import {GenericResolver} from '../core/services/resolver/generic.resolver';
import {AppPublicComponent} from './app-public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    resolve: {page: GenericResolver},
  }
];
@NgModule({
  declarations: [
    PublicComponent,
    AppPublicComponent
  ],
  imports: [
    CommonModule,
    AppAdminModule
  ],
  bootstrap: [AppPublicComponent]
})
export class PublicModule { }
