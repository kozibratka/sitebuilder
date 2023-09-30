import {BaseInput} from './base-input';
import {StringService} from '../../../services/string.service';
import {CheckboxAdminComponent} from '../components/form-admin/admin-input/checkbox-admin/checkbox-admin.component';
import {FormControl} from '@angular/forms';

export class Checkbox extends BaseInput {
  adminComponent = CheckboxAdminComponent;

  options: {option: string, validations: []}[];


  constructor() {
    super();
    this.options = [{option: 'možnost 1', validations: []}, {option: 'možnost 2', validations: []}, {option: 'možnost 3', validations: []}];
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'checkbox ' + StringService.randomString();
  }

  createForm(){
    return this.options.map(value => ({[value.option]: new FormControl('', value.validations)}));
  }

}
