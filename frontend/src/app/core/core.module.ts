import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalForRouteComponent } from './components/modal-for-route-component/modal-for-route.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RoutesCacheInterceptor} from './interceptors/routes-cache.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormErrorDirective } from './directives/form-error/form-error.directive';
import { ErrorMessageComponent } from './directives/form-error/tools/components/error-message/error-message.component';



@NgModule({
  declarations: [ModalForRouteComponent, FormErrorDirective, ErrorMessageComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [ModalForRouteComponent, FormErrorDirective],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RoutesCacheInterceptor, multi: true },
  ]
})
export class CoreModule { }
