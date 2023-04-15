import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
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
import {CarouselModule} from './carousel/carousel.module';
import {MenuModule} from './menu/menu.module';
import {TextModule} from './text/text.module';

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
    ],
  declarations: [
  ]
})
export class PluginsModule { }
