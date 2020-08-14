import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {AdminComponent} from './admin.component';
import {BrowserModule} from '@angular/platform-browser';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [AdminComponent, MenuComponent, DashboardComponent, TestComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    RouterModule
  ],
  providers: [],
  exports: [
    MenuComponent
  ],
  bootstrap: [AdminComponent, MenuComponent]
})
export class AdminModule { }
