import {BaseInput} from './base-input';
import {TextInputAdminComponent} from '../components/form-admin/admin-input/text-input-admin/text-input-admin.component';
import {FormControl, Validators} from '@angular/forms';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';
import {StringService} from '../../../services/string.service';

export class TextInput extends BaseInput{
  value: string;
  required = false;


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'text ' + StringService.randomString();
  }
  getAdminComponent(): typeof BaseAdminComponent<any> {
    return TextInputAdminComponent;
  }

  createForm(){
    const validations = [];
    if (this.required) {
      validations.push(Validators.required);
    }
    return {[this.name]: [null, validations]};
  }
}
