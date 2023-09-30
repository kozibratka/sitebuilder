import {BaseInput} from './base-input';
import {TextInputAdminComponent} from '../components/form-admin/admin-input/text-input-admin/text-input-admin.component';
import {FormControl} from '@angular/forms';

export class Textarea extends BaseInput{
  value: string;
  rows = 3;

  validators: [] = [];


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
  }

  adminComponent = TextInputAdminComponent;

  createForm(){
    return {[this.name]: new FormControl('', this.validators)};
  }
}
