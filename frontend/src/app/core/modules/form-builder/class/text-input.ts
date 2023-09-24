import {BaseInput} from './base-input';
import {TextInputAdminComponent} from '../components/admin-input/text-input-admin/text-input-admin.component';

export class TextInput extends BaseInput{
  value: string;


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
  }

  adminComponent = TextInputAdminComponent;
}
