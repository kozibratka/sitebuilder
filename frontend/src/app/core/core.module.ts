import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalForRouteComponent } from './components/modal-for-route-component/modal-for-route.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RoutesCacheInterceptor} from './interceptors/routes-cache.interceptor';
import {ToastrModule} from 'ngx-toastr';
import { InputFormErrorDirective } from './directives/form-error/input-form-error/input-form-error.directive';
import { ErrorMessageComponent } from './directives/form-error/input-form-error/tools/components/error-message/error-message.component';
import { HiderElementDirective } from './directives/hider-element.directive';
import {EventEmitterService} from './services/event-emitter-service';
import { InputFormErrorGrouperDirective } from './directives/form-error/input-form-error-grouper.directive';
import { GlobalFormErrorComponent } from './components/global-form-error/global-form-error.component';



@NgModule({
  declarations: [ModalForRouteComponent, InputFormErrorDirective, ErrorMessageComponent, HiderElementDirective, InputFormErrorGrouperDirective, GlobalFormErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
    exports: [ModalForRouteComponent, InputFormErrorDirective, HiderElementDirective, InputFormErrorGrouperDirective, GlobalFormErrorComponent],
  providers: [
    EventEmitterService,
    { provide: HTTP_INTERCEPTORS, useClass: RoutesCacheInterceptor, multi: true },
  ]
})
export class CoreModule { }
