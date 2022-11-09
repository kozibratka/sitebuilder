import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {RouterModule, Routes} from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';


const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegistrationComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AuthorizationModule { }
