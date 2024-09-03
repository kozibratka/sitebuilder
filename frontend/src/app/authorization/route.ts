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
        component: RegistrationComponent,
        title: 'Registrace NetDropper',
      },
      {
        path: 'login/:activated',
        component: LoginComponent,
        title: 'Přihlášení NetDropper',
      },
      {
        path: 'password-forgotten',
        component: PasswordForgottenComponent,
        title: 'Obnova hersla NetDropper',
      },
      {
        path: 'reset-password/:hash',
        component: ResetPasswordComponent,
        canActivate: [resetPasswordGuard],
        title: 'Obnova hersla NetDropper',
      },
      {
        path: 'activation/:hash',
        component: ActivationComponent,
        title: 'Aktivace NetDropper',
      }
    ]
  }
] as Routes
