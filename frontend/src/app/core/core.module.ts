import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalForRouteComponent } from './components/modal-for-route/modal-for-route.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ModalForRouteComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ModalForRouteComponent],

})
export class CoreModule { }
