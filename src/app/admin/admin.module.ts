import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {AdminComponent} from './admin.component';
import {BrowserModule} from '@angular/platform-browser';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {PageBuilderModule} from './page-builder/page-builder.module';
import {PluginsModule} from '../plugins/plugins.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AdminComponent, MenuComponent, DashboardComponent, TestComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SortablejsModule.forRoot({ animation: 150 }),
    AdminRoutingModule,
    PageBuilderModule,
    PluginsModule,
    NgbModule
  ],
  providers: [],
  exports: [
    MenuComponent
  ],
  bootstrap: [AdminComponent, MenuComponent]
})
export class AdminModule { }
