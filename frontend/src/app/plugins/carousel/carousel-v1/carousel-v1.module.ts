import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CarouselV1ResolverService} from './services/carousel-v1-resolver.service';
import {CarouselV1Component} from './components/carousel-v1.component';
import {EffectAdminComponent} from './pages/effect-admin/effect-admin.component';
import {ImagesAdminComponent} from './pages/images-admin/images-admin.component';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {CdkDropListGroup} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule} from 'angular-mixed-cdk-drag-drop';
import {CoreModule} from '../../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    CarouselV1Component,
    EffectAdminComponent,
    ImagesAdminComponent
  ],
  imports: [
    CommonModule,
    NgbCarousel,
    NgbSlide,
    CdkDropListGroup,
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
