import {Routes} from "@angular/router";
import {PageResolver} from "../public/services/page.resolver";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";


export const websiteRoute: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }
]
