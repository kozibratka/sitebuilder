import {AuthorizationComponent} from "./pages/authorization/authorization.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {Routes} from "@angular/router";
import {PasswordForgottenComponent} from "./components/password-forgotten/password-forgotten.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {resetPasswordGuard} from "./resolvers/reset-password.guard";
import {ActivationComponent} from "./components/activation/activation.component";

export default   [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      {pathMatch: 'full', path: 'login', redirectTo: 'login/0'},
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'login/:activated',
        component: LoginComponent
      },
      {
        path: 'password-forgotten',
        component: PasswordForgottenComponent
      },
      {
        path: 'reset-password/:hash',
        component: ResetPasswordComponent,
        canActivate: [resetPasswordGuard],
      },
      {
        path: 'activation/:hash',
        component: ActivationComponent,
      }
    ]
  }
] as Routes
