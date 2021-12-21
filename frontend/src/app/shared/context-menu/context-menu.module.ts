import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ContextMenuV2Component } from './components/context-menu-v2/context-menu-v2.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ContextMenuComponent,
    ContextMenuV2Component
  ],
    imports: [
      CommonModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule,
    ]
})
export class ContextMenuModule { }
