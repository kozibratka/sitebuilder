import {BaseInput} from './base-input';
import {StringService} from '../../../services/string.service';
import {SelectboxAdminComponent} from '../components/form-admin/admin-input/selectbox-admin/selectbox-admin.component';
import {FormBuilder, FormControl} from '@angular/forms';

export class Selectbox extends BaseInput{
  options: string[];
  validators: [] = [];


  constructor(
    private fb: FormBuilder
  ) {
    super();
    this.options = ['možnost 1', 'možnost 2', 'možnost 3'];
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'select ' + StringService.randomString();
  }

  adminComponent = SelectboxAdminComponent;

  createForm(){
    return {[this.name]: new FormControl('', this.validators)};
  }
}
