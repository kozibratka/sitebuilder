import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminModule} from '../admin/admin.module';
import { FrontendComponent } from './frontend/frontend.component';



@NgModule({
  declarations: [
    FrontendComponent
  ],
  imports: [
    CommonModule,
    AdminModule,
  ]
})
export class PublicModule { }
