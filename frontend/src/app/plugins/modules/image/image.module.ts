import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ImageResolverService} from './services/image-resolver.service';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {ImageComponent} from './components/image/image.component';
import {ImageAdminComponent} from './pages/image-admin/image-admin.component';



@NgModule({
  declarations: [
    ImageComponent,
    ImageAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: ImageResolverService, multi: true},
  ],
})
export class ImageModule { }
