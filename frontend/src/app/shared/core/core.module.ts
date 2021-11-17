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



@NgModule({
  declarations: [
    ModalForRouteComponent,
    InputFormErrorDirective,
    ErrorMessageComponent,
    HiderElementDirective,
    InputFormErrorGrouperDirective,
    GlobalFormErrorComponent,
    MoveAbleSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DragDropModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    ModalForRouteComponent,
    InputFormErrorDirective,
    HiderElementDirective,
    InputFormErrorGrouperDirective,
    GlobalFormErrorComponent,
    MoveAbleSettingsComponent
  ],
  providers: [
    EventEmitterService,
    JqueryVersionService,
    EventEmitterService,
    MatTreeService

  ]
})
export class CoreModule { }
