import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../core.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {FormBuilderComponent} from './components/form-admin/form-builder/form-builder.component';
import {FormInputComponent} from './components/form-admin/form-input/form-input.component';
import {TextInputAdminComponent} from './components/form-admin/admin-input/text-input-admin/text-input-admin.component';
import {TextareaAdminComponent} from './components/form-admin/admin-input/textarea-admin/textarea-admin.component';
import {SelectboxAdminComponent} from './components/form-admin/admin-input/selectbox-admin/selectbox-admin.component';
import {BaseAdminComponent} from './components/form-admin/admin-input/base-admin/base-admin.component';
import {CheckboxAdminComponent} from './components/form-admin/admin-input/checkbox-admin/checkbox-admin.component';
import {ButtonAdminComponent} from './components/form-admin/admin-input/button-admin/button-admin.component';



@NgModule({
  declarations: [
    FormBuilderComponent,
    FormInputComponent,
    TextInputAdminComponent,
    TextareaAdminComponent,
    SelectboxAdminComponent,
    ButtonAdminComponent,
    BaseAdminComponent,
    CheckboxAdminComponent,
  ],
  exports: [
    FormBuilderComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class FormBuilderModule { }
