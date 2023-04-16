import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextV1Component} from './components/text-v1/text-v1.component';
import {TextAdminComponent} from './pages/admin/text-admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';



@NgModule({
  declarations: [
    TextV1Component,
    TextAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: TextV1Module, multi: true},
  ],
})
export class TextV1Module { }
