import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TextResolverService} from './services/text-resolver.service';
import {CoreModule} from '../../../core/core.module';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {TextComponent} from './components/text/text.component';
import { TinymceAdminComponent } from './pages/tinymce-admin/tinymce-admin.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    TextComponent,
    TinymceAdminComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        EditorModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: TextResolverService, multi: true},
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
})
export class TextModule { }
