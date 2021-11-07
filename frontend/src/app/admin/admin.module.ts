import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from '@angular/router';
import {SortablejsModule} from 'ngx-sortablejs';
import {PluginsModule} from '../plugins/plugins.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntryRouteComponent } from './entry-route/entry-route.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {GravatarModule} from 'ngx-gravatar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {AdminComponent} from './entry-route/administration/admin/admin.component';
import {MenuComponent} from './entry-route/administration/menu/menu.component';
import {DashboardComponent} from './entry-route/administration/admin/dashboard/dashboard.component';
import {LoginComponent} from './entry-route/authorization/login/login.component';
import {AdministrationComponent} from './entry-route/administration/administration.component';
import {AuthorizationComponent} from './entry-route/authorization/authorization.component';
import {RegistrationComponent} from './entry-route/authorization/registration/registration.component';
import {WebListComponent} from './entry-route/administration/admin/web/web-list/web-list.component';
import {RemoveWebDialogComponent} from './entry-route/administration/admin/web/web-list/tools/components/remove-web-dialog/remove-web-dialog.component';
import {WebCreateComponent} from './entry-route/administration/admin/web/web-create/web-create.component';
import {PageCreateComponent} from './entry-route/administration/admin/page/page-create/page-create.component';
import {PageListComponent} from './entry-route/administration/admin/page/page-list/page-list.component';
import {RemovePageDialogComponent} from './entry-route/administration/admin/page/page-list/tools/components/remove-page-dialog/remove-page-dialog.component';
import {PageBuilderComponent} from './entry-route/administration/admin/page/page-builder/page-builder.component';
import {MenuBuilderComponent} from './entry-route/administration/admin/page/page-builder/menu-builder/menu-builder.component';
import {PaletteBuilderComponent} from './entry-route/administration/admin/page/page-builder/palette-builder/palette-builder.component';
import {DragScrollDirective} from './entry-route/administration/admin/page/page-builder/palette-builder/tools/directives/drag-scroll-directive';
import {PageBlockComponent} from './entry-route/administration/admin/page/page-builder/palette-builder/page-block/page-block.component';
import {MenuPluginResolverDirective} from './entry-route/administration/admin/page/page-builder/menu-builder/tools/directives/menu-plugin-resolver.directive';
import {PaletteItemComponent} from './entry-route/administration/admin/page/page-builder/palette-builder/page-block/palette-item-component/palette-item.component';
import {PaletteItemQuickMenuComponent} from './entry-route/administration/admin/page/page-builder/palette-builder/palette-item-quick-menu/palette-item-quick-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
    PageListComponent,
    RemovePageDialogComponent,
    PageBuilderComponent,
    MenuBuilderComponent,
    PaletteBuilderComponent,
    DragScrollDirective,
    PageBlockComponent,
    MenuPluginResolverDirective,
    PaletteItemComponent,
    PaletteItemQuickMenuComponent
  ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        SortablejsModule.forRoot({animation: 150}),
        AdminRoutingModule,
        PluginsModule,
        NgbModule,
        ReactiveFormsModule,
        CoreModule,
        GravatarModule,
        MatTableModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        DragDropModule,
    ],
  providers: [{provide: Window, useValue: window}],
  exports: [
    MenuComponent,
  ],
  bootstrap: [EntryRouteComponent]
})
export class AdminModule { }
