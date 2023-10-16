import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormResolverService} from './services/form-resolver.service';
import {ReactiveFormsModule} from '@angular/forms';
import {FormPublicComponent} from '../../../core/modules/form-builder/components/form-public/form-public/form-public.component';
import {FormBuilderModule} from '../../../core/modules/form-builder/form-builder.module';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {FormComponent} from './components/form/form.component';
import {FormAdminComponent} from './pages/form-admin/form-admin.component';
import { FormDataAdminComponent } from './pages/form-data-admin/form-data-admin.component';



@NgModule({
    declarations: [
        FormAdminComponent,
        FormComponent,
        FormPublicComponent,
        FormDataAdminComponent
    ],
    imports: [
        CommonModule,
        FormBuilderModule,
        ReactiveFormsModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: FormResolverService, multi: true},
  ],
})
export class FormModule { }
