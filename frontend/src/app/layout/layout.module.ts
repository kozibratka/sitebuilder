import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CoreModule} from '../core/core.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {GravatarModule} from 'ngx-gravatar';
import {MatIconModule} from "@angular/material/icon";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  }
];
@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatSelectModule,
        CoreModule,
        MatProgressBarModule,
        GravatarModule,
        MatIconModule
    ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
