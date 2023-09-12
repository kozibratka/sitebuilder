import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import {CoreModule} from '../../core.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    FormBuilderComponent,
    FormInputComponent
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
