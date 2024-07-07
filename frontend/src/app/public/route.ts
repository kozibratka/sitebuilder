import {PublicComponent} from "./pages/public/public.component";
import {PageResolver} from "./services/page.resolver";


export default   [
  {
    path: '**',
    component: PublicComponent,
    resolve: {pageDetail: PageResolver},
  }
];
