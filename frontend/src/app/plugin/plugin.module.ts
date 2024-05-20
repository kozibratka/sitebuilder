import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginRoutingModule } from './plugin-routing.module';
import { PluginComponent } from './plugin.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {ListCreatedComponent} from './pages/list-created/list-created.component';
import {ListAvailableComponent} from './pages/list-available/list-available.component';
import {CreatePluginComponent} from './pages/create-plugin/create-plugin.component';
import {CoreModule} from '../core/core.module';
import {UpdatePluginComponent} from './pages/update-plugin/update-plugin.component';
import {RemoveDialogComponent} from './components/remove-dialog/remove-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    PluginComponent,
    ListAvailableComponent,
    ListCreatedComponent,
    CreatePluginComponent,
    UpdatePluginComponent,
    RemoveDialogComponent,
  ],
  imports: [
    CommonModule,
    PluginRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class PluginModule { }
