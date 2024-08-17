import {Routes} from "@angular/router";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {PreviewComponent} from "./pages/preview/preview.component";


export const websiteRoute: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'preview',
    component: PreviewComponent,
  }
]
