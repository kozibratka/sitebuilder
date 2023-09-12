import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import {CoreModule} from '../../core.module';



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
    CoreModule
  ]
})
export class FormBuilderModule { }
