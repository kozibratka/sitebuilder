import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import {CoreModule} from '../../core.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { TextInputAdminComponent } from './components/admin-input/text-input-admin/text-input-admin.component';
import { TextareaAdminComponent } from './components/admin-input/textarea-admin/textarea-admin.component';
import { SelectboxAdminComponent } from './components/admin-input/selectbox-admin/selectbox-admin.component';
import { BaseAdminComponent } from './components/admin-input/base-admin/base-admin.component';



@NgModule({
  declarations: [
    FormBuilderComponent,
    FormInputComponent,
    TextInputAdminComponent,
    TextareaAdminComponent,
    SelectboxAdminComponent,
    BaseAdminComponent,
  ],
  exports: [
    FormBuilderComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class FormBuilderModule { }
