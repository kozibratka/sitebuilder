import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotifierService} from './notifier.service';
import {CoreModule} from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class HttpResponseToasterService {

  constructor(private notifierService: NotifierService) {
  }

  showError(error: string | HttpErrorResponse, codeStatus?: number, errorMessage?: string): void {
    let completedMessage = '';
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        completedMessage = 'Nepodařilo se kontaktovat server. Zkontrolujte stav vašeho připojení.';
      } else {
        switch (error.status) {
          case 404:
            completedMessage = 'Pořadovaný cíl nebyl nalezen';
            break;
          case 500:
            completedMessage = 'Na serveru došlo k chybě. Opakujte prosím akci později.';
            break;
          case 403:
            completedMessage = 'Operace zamítnuta. Ujistěte se, že máte dostatečná práva.';
            break;
          case 401:
            completedMessage = 'Nesprávné přihlašovací údaje nebo token expiroval. Zkuste se prosím znovu přihlásit';
            break;
          default:
            completedMessage = 'Neočekávaná chyba serveru. Kód chyby: ' + error.status;
            break;
        }
        if (codeStatus && error.status === codeStatus) {
          completedMessage = errorMessage ?? '';
        }
      }

    } else {
      completedMessage = error;
    }
    this.notifierService.notify(completedMessage, 'error');
  }
}
