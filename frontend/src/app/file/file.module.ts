import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileComponent} from './components/file/file.component';
import {RouterModule, Routes} from '@angular/router';
import {FileManagerModule} from '../core/modules/file-manager/file-manager.module';


const routes: Routes = [
  {
    path: '',
    component: FileComponent,
  }
];
@NgModule({
  declarations: [
    FileComponent
  ],
  imports: [
    CommonModule,
    FileManagerModule,
    RouterModule.forChild(routes),
  ]
})
export class FileModule { }
