import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginRoutingModule } from './plugin-routing.module';
import { PluginComponent } from './plugin.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {ListAvailableComponent} from './list-available/list-available.component';
import {ListCreatedComponent} from './list-created/list-created.component';
import {MatButtonModule} from '@angular/material/button';
import { CreatePluginComponent } from './create-plugin/create-plugin.component';
import { UpdatePluginComponent } from './update-plugin/update-plugin.component';
import {CoreModule} from '../../../../../shared/core/core.module';


@NgModule({
  declarations: [
    PluginComponent,
    ListAvailableComponent,
    ListCreatedComponent,
    CreatePluginComponent,
    UpdatePluginComponent
  ],
    imports: [
        CommonModule,
        PluginRoutingModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        CoreModule
    ]
})
export class PluginModule { }
