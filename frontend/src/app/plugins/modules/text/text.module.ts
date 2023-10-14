import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {TextResolverService} from './services/text-resolver.service';
import {CoreModule} from '../../../core/core.module';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {TextTextAdminComponent} from './pages/text-admin/text-text-admin.component';
import {TextComponent} from './components/text/text.component';



@NgModule({
  declarations: [
    TextComponent,
    TextTextAdminComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CKEditorModule,
        CoreModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: TextResolverService, multi: true},
  ],
})
export class TextModule { }
