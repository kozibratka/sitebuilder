import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {SortablejsModule} from 'ngx-sortablejs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {GravatarModule} from 'ngx-gravatar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {AdminComponent} from './administration/admin/admin.component';
import {PaletteItemComponent} from './page/components/palette-builder/page-block/palette-item-component/palette-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TestComponent} from './administration/admin/test/test.component';
import { TestDirectiveDirective } from './administration/admin/test/test-directive.directive';
import {AppAdminRoutingModule} from './app-admin-routing.module';
import {AppAdminComponent} from './app-admin.component';
import {CoreModule} from './core/core.module';
import {PluginsModule} from './plugins/plugins.module';
import {FileManagerModule} from './core/modules/file-manager/file-manager.module';
import {LayoutModule} from './layout/layout.module';

@NgModule({
  declarations: [
    AdminComponent,
    PaletteItemComponent,
    TestComponent,
    TestDirectiveDirective,
    AppAdminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SortablejsModule.forRoot({animation: 150}),
    AppAdminRoutingModule,
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
    FontAwesomeModule,
    FileManagerModule,
    LayoutModule
  ],
  providers: [{provide: Window, useValue: window}],
  exports: [
  ],
  bootstrap: [AppAdminComponent]
})
export class AppAdminModule { }
