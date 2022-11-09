import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WebListComponent} from './pages/web-list/web-list.component';
import {WebCreateComponent} from './pages/web-create/web-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {CoreModule} from '../core/core.module';
import {RemoveWebDialogComponent} from './components/remove-web-dialog/remove-web-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
    path: 'list',
    component: WebListComponent,
  },
  {
    path: 'create',
    component: WebCreateComponent
  },
  {
    path: 'update/:webId',
    component: WebCreateComponent,
  }
];
@NgModule({
  declarations: [
    WebListComponent,
    WebCreateComponent,
    RemoveWebDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class WebModule { }
