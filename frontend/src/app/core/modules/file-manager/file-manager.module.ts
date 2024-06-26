import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { LargeItemComponent } from './components/file-manager/large-item/large-item.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragToSelectModule} from 'ngx-drag-to-select';
import {ContextMenuModule} from '../context-menu/context-menu.module';
import {CoreModule} from '../../core.module';
import { FileManagerDialogComponent } from './components/file-manager-dialog/file-manager-dialog.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { PixabayComponent } from './components/pixabay/pixabay.component';



@NgModule({
  declarations: [FileManagerComponent, LargeItemComponent, FileManagerDialogComponent, ImageInputComponent, PixabayComponent],
  exports: [
    FileManagerComponent,
    ImageInputComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    ContextMenuModule,
    MatSnackBarModule,
    DragToSelectModule.forRoot(),
    CoreModule,
    MatTooltipModule
  ]
})
export class FileManagerModule { }
