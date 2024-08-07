import {AuthorizationComponent} from "./pages/authorization/authorization.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {Routes} from "@angular/router";

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
      }
    ]
  }
] as Routes
