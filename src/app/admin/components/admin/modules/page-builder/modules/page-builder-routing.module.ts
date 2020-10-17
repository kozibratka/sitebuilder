import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageBuilderComponent} from '../components/page-builder/page-builder.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: PageBuilderComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PageBuilderRoutingModule { }
