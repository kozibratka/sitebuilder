import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";
import {map} from "rxjs/operators";

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  let symfonyApiClientService= inject(SymfonyApiClientService);
  let hash = route.params['hash'];
  return symfonyApiClientService.get('login_reset_password', {hash}).pipe(map(x => true));
};
