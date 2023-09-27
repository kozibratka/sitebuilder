import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormV1AdminComponent } from './pages/form-v1-admin/form-v1-admin.component';
import {FormBuilderModule} from '../../../../core/modules/form-builder/form-builder.module';
import { FormV1Component } from './components/form-v1/form-v1.component';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {FormV1ResolverService} from './services/form-v1-resolver.service';



@NgModule({
  declarations: [
    FormV1AdminComponent,
    FormV1Component
  ],
    imports: [
        CommonModule,
        FormBuilderModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: FormV1ResolverService, multi: true},
  ],
})
export class FormV1Module { }
