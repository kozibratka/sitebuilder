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
import { CarouselBootstrapImagesAdminComponent } from './carousel-bootstrap-plugin/pages/carousel-bootstrap-images-admin/carousel-bootstrap-images-admin.component';
import {CarouselBootstrapPluginResolverService} from './carousel-bootstrap-plugin/services/carousel-bootstrap-plugin-resolver.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule} from 'angular-mixed-cdk-drag-drop';
import {CarouselBootstrapPluginComponent} from './carousel-bootstrap-plugin/carousel-bootstrap-plugin.component';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    CKEditorModule,
    FormsModule,
    DragDropModule,
    MixedCdkDragDropModule,
    NgbCarousel,
    NgbSlide,
  ],
  providers: [
     {provide: AbstractPluginResolver, useClass: TextPluginResolverService, multi: true},
     {provide: AbstractPluginResolver, useClass: CarouselBootstrapPluginResolverService, multi: true},
  ],
  declarations: [
    TextPluginAdminComponent,
    CarouselBootstrapImagesAdminComponent,
    CarouselBootstrapPluginComponent
  ]
})
export class PluginsModule { }
