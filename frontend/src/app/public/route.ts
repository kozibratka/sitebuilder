import {PublicComponent} from "./pages/public/public.component";
import {PageResolver} from "./services/page.resolver";
import {Routes} from "@angular/router";


export const publicRoutes: Routes = [
  {
    path: '**',
    component: PublicComponent,
    resolve: {pageDetail: PageResolver},
  }
]
