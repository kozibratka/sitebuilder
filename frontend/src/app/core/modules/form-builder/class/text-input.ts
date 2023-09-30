import {BaseInput} from './base-input';
import {TextInputAdminComponent} from '../components/form-admin/admin-input/text-input-admin/text-input-admin.component';
import {FormControl} from '@angular/forms';

export class TextInput extends BaseInput{
  value: string;
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
