import {BaseInput} from './base-input';
import {FormControl, Validators} from '@angular/forms';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';
import {TextareaAdminComponent} from '../components/form-admin/admin-input/textarea-admin/textarea-admin.component';
import {StringService} from '../../../services/string.service';

export class Textarea extends BaseInput{
  value: string;
  rows = 3;

  required = false;


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'textarea ' + StringService.randomString();
  }
  getAdminComponent(): typeof BaseAdminComponent<any> {
    return TextareaAdminComponent;
  }

  createForm() {
    const validations = [];
    if (this.required) {
      validations.push(Validators.required);
    }
    return {[this.name]: ['', validations]};
  }
}
