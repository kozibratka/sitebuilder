import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ContextMenuComponent,
    ContextMenuComponent
  ],
    imports: [
      CommonModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule,
    ]
})
export class ContextMenuModule { }
