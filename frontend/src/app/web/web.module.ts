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
import { SelectTemplateComponent } from './pages/web-create/select-template/select-template.component';
import { CreateNameComponent } from './pages/web-create/create-name/create-name.component';
import {GenericResolver} from "../core/services/resolver/generic.resolver";
import {WebDetailResolverService} from "./services/web-detail-resolver.service";


const routes: Routes = [
  {
    path: 'list',
    component: WebListComponent,
  },
  {
    path: 'select-template',
    component: SelectTemplateComponent,
    resolve: {templates: GenericResolver},
    data: {resolverConfig: {data: {route: 'web_template_list'}}},
  },
  {
    path: 'create-name/:idTemplate',
    component: CreateNameComponent
  },
  {
    path: 'update/:webId',
    component: WebCreateComponent,
    resolve: {web: GenericResolver},
    data: {resolverConfig: {data: {route: 'web_read'}, queryDataMap: {webId: 'id'}}},
  }
];
@NgModule({
  declarations: [
    WebListComponent,
    WebCreateComponent,
    RemoveWebDialogComponent,
    SelectTemplateComponent,
    CreateNameComponent
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
