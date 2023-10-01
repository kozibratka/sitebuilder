import {BaseInput} from './base-input';
import {StringService} from '../../../services/string.service';
import {CheckboxAdminComponent} from '../components/form-admin/admin-input/checkbox-admin/checkbox-admin.component';
import {FormControl, Validators} from '@angular/forms';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';

export class Checkbox extends BaseInput {
  options: {option: string, required: boolean}[];


  constructor() {
    super();
    this.options = [{option: 'možnost 1', required: false}, {option: 'možnost 2', required: false}, {option: 'možnost 3', required: false}];
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'checkbox ' + StringService.randomString();
  }

  getAdminComponent(): typeof BaseAdminComponent<any> {
    return CheckboxAdminComponent;
  }

  createForm(){
    return this.options.map(value => ({[value.option]: new FormControl('', [value.required ? Validators.required : null])}));
  }

}
