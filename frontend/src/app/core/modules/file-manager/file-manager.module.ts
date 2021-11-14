import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [FileManagerComponent],
  exports: [
    FileManagerComponent
  ],
    imports: [
        CommonModule,
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class FileManagerModule { }
