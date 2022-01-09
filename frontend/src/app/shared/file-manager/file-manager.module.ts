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
import {CoreModule} from '../core/core.module';
import { LargeItemComponent } from './components/file-manager/large-item/large-item.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ContextMenuModule} from '../context-menu/context-menu.module';



@NgModule({
  declarations: [FileManagerComponent, LargeItemComponent],
  exports: [
    FileManagerComponent
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
    CoreModule,
    MatCheckboxModule,
    ContextMenuModule
  ]
})
export class FileManagerModule { }
