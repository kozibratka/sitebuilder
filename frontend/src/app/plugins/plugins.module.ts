import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextPluginResolverService} from './text-plugin/tools/services/text-plugin-resolver.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextPluginAdminComponent} from './text-plugin/admin/text-plugin-admin/text-plugin-admin.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {AbstractPluginResolver} from '../page/services/abstract-classes/abstract-plugin-resolver';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { CarouselBootstrapPluginComponent } from './carousel-bootstrap-plugin/carousel-bootstrap-plugin.component';
import { CarouselBootstrapImagesAdminComponent } from './carousel-bootstrap-plugin/pages/carousel-bootstrap-images-admin/carousel-bootstrap-images-admin.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselBootstrapPluginResolverService} from './carousel-bootstrap-plugin/services/carousel-bootstrap-plugin-resolver.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    CKEditorModule,
    NgbCarouselModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [
     {provide: AbstractPluginResolver, useClass: TextPluginResolverService, multi: true},
     {provide: AbstractPluginResolver, useClass: CarouselBootstrapPluginResolverService, multi: true},
  ],
  declarations: [
    TextPluginAdminComponent,
    CarouselBootstrapPluginComponent,
    CarouselBootstrapImagesAdminComponent
  ]
})
export class PluginsModule { }
