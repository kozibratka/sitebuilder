import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu-component/menu.component';
import {AdminComponent} from './admin-component/admin.component';
import {BrowserModule} from '@angular/platform-browser';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './admin-component/dashboard-component/dashboard.component';
import { TestComponent } from './admin-component/test-component/test.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {PageBuilderModule} from './admin-component/page-builder-module/page-builder.module';
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
    MenuComponent,
  ],
  bootstrap: [AdminComponent, MenuComponent]
})
export class AdminModule { }
