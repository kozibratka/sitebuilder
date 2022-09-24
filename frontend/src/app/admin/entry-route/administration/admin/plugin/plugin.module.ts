import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginRoutingModule } from './plugin-routing.module';
import { PluginComponent } from './plugin.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {ListAvailableComponent} from './list-available/list-available.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    PluginComponent,
    ListAvailableComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PluginRoutingModule,
    MatTableModule,
    MatIconModule
  ]
})
export class PluginModule { }
