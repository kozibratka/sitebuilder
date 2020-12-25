import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from '@angular/router';
import {SortablejsModule} from 'ngx-sortablejs';
import {PluginsModule} from '../plugins/plugins.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminComponent} from './entry-route/administration-component/admin-component/admin.component';
import {MenuComponent} from './entry-route/administration-component/menu-component/menu.component';
import {DashboardComponent} from './entry-route/administration-component/admin-component/dashboard-component/dashboard.component';
import {LoginComponent} from './entry-route/authorization-component/login-component/login.component';
import {AdministrationComponent} from './entry-route/administration-component/administration.component';
import {AuthorizationComponent} from './entry-route/authorization-component/authorization.component';
import {PageBuilderModule} from './entry-route/administration-component/admin-component/page-builder-module/page-builder.module';
import { EntryRouteComponent } from './entry-route/entry-route.component';
import { RegistrationComponent } from './entry-route/authorization-component/registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {GravatarModule} from 'ngx-gravatar';
import { WebListComponent } from './entry-route/administration-component/admin-component/web-component/web-list/web-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RemoveWebDialogComponent } from './entry-route/administration-component/admin-component/web-component/web-list/tools/components/remove-web-dialog/remove-web-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { WebCreateComponent } from './entry-route/administration-component/admin-component/web-component/web-create/web-create.component';
import { PageCreateComponent } from './entry-route/administration-component/admin-component/page-component/page-create/page-create.component';
import { PageListComponent } from './entry-route/administration-component/admin-component/page-component/page-list/page-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    DashboardComponent,
    LoginComponent,
    AdministrationComponent,
    AuthorizationComponent,
    EntryRouteComponent,
    RegistrationComponent,
    WebListComponent,
    RemoveWebDialogComponent,
    WebCreateComponent,
    PageCreateComponent,
    PageListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SortablejsModule.forRoot({animation: 150}),
    AdminRoutingModule,
    PageBuilderModule,
    PluginsModule,
    NgbModule,
    ReactiveFormsModule,
    CoreModule,
    GravatarModule,
    MatTableModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [
    MenuComponent,
  ],
  bootstrap: [EntryRouteComponent]
})
export class AdminModule { }
