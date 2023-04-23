import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselV1ResolverService} from './services/carousel-v1-resolver.service';
import {CarouselV1Component} from './components/carousel-v1.component';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {MixedCdkDragDropModule} from 'angular-mixed-cdk-drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {CoreModule} from '../../../../core/core.module';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {CarouselV1EffectAdminComponent} from './pages/carousel-v1-effect-admin/carousel-v1-effect-admin.component';
import {CarouselV1ImagesAdminComponent} from './pages/carousel-v1-images-admin/carousel-v1-images-admin.component';

@NgModule({
  declarations: [
    CarouselV1Component,
    CarouselV1EffectAdminComponent,
    CarouselV1ImagesAdminComponent
  ],
  imports: [
    CommonModule,
    NgbCarousel,
    NgbSlide,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    MixedCdkDragDropModule,
    CoreModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: CarouselV1ResolverService, multi: true},
  ],
})
export class CarouselV1Module { }
