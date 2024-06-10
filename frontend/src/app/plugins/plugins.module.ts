import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule} from 'angular-mixed-cdk-drag-drop';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SortablejsModule} from 'ngx-sortablejs';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {CarouselModule} from './modules/carousel/carousel.module';
import {MenuModule} from './modules/menu/menu.module';
import {TextModule} from './modules/text/text.module';
import {ImageModule} from './modules/image/image.module';
import {VideoModule} from './modules/video/video.module';
import {FormModule} from './modules/form/form.module';
import { AdminPluginSelectComponent } from './components/plugin-select/admin-plugin-select.component';
import { PluginDimensionAdminComponent } from './components/plugin-dimension-admin/plugin-dimension-admin.component';
import {FileManagerModule} from "../core/modules/file-manager/file-manager.module";
import {ButtonModule} from "./modules/button/button.module";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    DragDropModule,
    MixedCdkDragDropModule,
    NgbCarousel,
    NgbSlide,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    SortablejsModule.forRoot({animation: 150}),
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    CarouselModule,
    MenuModule,
    TextModule,
    ImageModule,
    VideoModule,
    ButtonModule,
    FormModule,
    FileManagerModule
  ],
  declarations: [
    AdminPluginSelectComponent,
    PluginDimensionAdminComponent,
  ]
})
export class PluginsModule { }
