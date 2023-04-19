import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextV1Component} from './components/text-v1/text-v1.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {TextV1ResolverService} from './services/text-v1-resolver.service';
import {TextV1TextAdminComponent} from './pages/text-v1-admin/text-v1-text-admin.component';



@NgModule({
  declarations: [
    TextV1Component,
    TextV1TextAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: TextV1ResolverService, multi: true},
  ],
})
export class TextV1Module { }
