import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageV1Component } from './components/image-v1/image-v1.component';
import { ImageV1AdminComponent } from './pages/image-v1-admin/image-v1-admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {ImageV1ResolverService} from './services/image-v1-resolver.service';



@NgModule({
  declarations: [
    ImageV1Component,
    ImageV1AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: ImageV1ResolverService, multi: true},
  ],
})
export class ImageV1Module { }
