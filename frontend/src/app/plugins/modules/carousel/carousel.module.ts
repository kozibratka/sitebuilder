import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselResolverService} from './services/carousel-resolver.service';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {MixedCdkDragDropModule} from 'angular-mixed-cdk-drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {CoreModule} from '../../../core/core.module';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CarouselEffectAdminComponent} from './pages/carousel-effect-admin/carousel-effect-admin.component';
import {CarouselImagesAdminComponent} from './pages/carousel-images-admin/carousel-images-admin.component';
import {CarouselComponent} from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselEffectAdminComponent,
    CarouselImagesAdminComponent
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
    {provide: AbstractPluginResolver, useClass: CarouselResolverService, multi: true},
  ],
})
export class CarouselModule { }
