import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendComponent } from './frontend/frontend.component';
import {AppAdminModule} from '../app-admin.module';

@NgModule({
  declarations: [
    FrontendComponent
  ],
  imports: [
    CommonModule,
    AppAdminModule
  ],
  bootstrap: [FrontendComponent]
})
export class PublicModule { }
