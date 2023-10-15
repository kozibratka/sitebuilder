import {BaseInput} from './base-input';
import {StringService} from '../../../services/string.service';
import {SelectboxAdminComponent} from '../components/form-admin/admin-input/selectbox-admin/selectbox-admin.component';
import {FormControl, Validators} from '@angular/forms';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';

export class Selectbox extends BaseInput{
  options: string[];
  required = false;


  constructor(
  ) {
    super();
    this.options = ['možnost 1', 'možnost 2', 'možnost 3'];
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'select ' + StringService.randomString();
  }
  getAdminComponent(): typeof BaseAdminComponent<any> {
    return SelectboxAdminComponent;
  }

  createForm(){
    const validations = [];
    if (this.required) {
      validations.push(Validators.required);
    }
    return {[this.name]: ['', validations]};
  }
}
