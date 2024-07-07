import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private toastrService: ToastrService) {
  }

  notify(message: string, type: 'error' | 'success' | 'warning' = 'success'): void {
    switch (type) {
      case 'error':
        this.toastrService.error(message);
        break;
      case 'success':
        this.toastrService.success(message);
        break;
      case 'warning':
        this.toastrService.warning(message);
        break;
    }
  }
}
