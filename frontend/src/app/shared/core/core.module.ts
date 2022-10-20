import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalForRouteComponent } from './components/modal-for-route-component/modal-for-route.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { InputFormErrorDirective } from './directives/form-error/input-form-error/input-form-error.directive';
import { ErrorMessageComponent } from './directives/form-error/input-form-error/tools/components/error-message/error-message.component';
import { HiderElementDirective } from './directives/hider-element.directive';
import {EventEmitterService} from './services/event-emitter-service';
import { InputFormErrorGrouperDirective } from './directives/form-error/input-form-error-grouper.directive';
import { GlobalFormErrorComponent } from './components/global-form-error/global-form-error.component';
import { MoveAbleSettingsComponent } from './components/move-able-settings/move-able-settings.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {JqueryVersionService} from './services/jquery-version.service';
import {MatTreeService} from './services/mat-tree.service';
import { HidderComponent } from './components/hidder/hidder.component';
import { DirectoryMiniNavigationComponent } from './components/directory-mini-navigation/directory-mini-navigation.component';
import { IconResolverComponent } from './components/icon-resolver/icon-resolver.component';
import {MatIconModule} from '@angular/material/icon';
import {FileIconsModule} from 'ngx-file-icons';
import { MoveableModalComponent } from './components/moveable-modal/moveable-modal.component';
import { MiniAdminComponent } from './components/mini-admin/mini-admin.component';
import { RemoveDialogComponent } from '../../admin/entry-route/administration/admin/plugin/list-created/tools/components/remove-dialog/remove-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    ModalForRouteComponent,
    InputFormErrorDirective,
    ErrorMessageComponent,
    HiderElementDirective,
    InputFormErrorGrouperDirective,
    GlobalFormErrorComponent,
    MoveAbleSettingsComponent,
    HidderComponent,
    DirectoryMiniNavigationComponent,
    IconResolverComponent,
    MoveableModalComponent,
    MiniAdminComponent,
    RemoveDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DragDropModule,
    ToastrModule.forRoot(),
    MatIconModule,
    FileIconsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ModalForRouteComponent,
    InputFormErrorDirective,
    HiderElementDirective,
    InputFormErrorGrouperDirective,
    GlobalFormErrorComponent,
    MoveAbleSettingsComponent,
    HidderComponent,
    DirectoryMiniNavigationComponent,
    IconResolverComponent,
    MiniAdminComponent
  ],
  providers: [
    EventEmitterService,
    JqueryVersionService,
    EventEmitterService,
    MatTreeService

  ]
})
export class CoreModule { }
