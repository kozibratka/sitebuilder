import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ImageResolverService} from './services/image-resolver.service';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {ImageComponent} from './components/image/image.component';
import {ImageAdminComponent} from './pages/image-admin/image-admin.component';
import { StyleAdminComponent } from './pages/style-admin/style-admin.component';
import {MatSliderModule} from "@angular/material/slider";
import {FileManagerModule} from "../../../core/modules/file-manager/file-manager.module";



@NgModule({
  declarations: [
    ImageComponent,
    ImageAdminComponent,
    StyleAdminComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSliderModule,
        FormsModule,
        FileManagerModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: ImageResolverService, multi: true},
  ],
})
export class ImageModule { }
