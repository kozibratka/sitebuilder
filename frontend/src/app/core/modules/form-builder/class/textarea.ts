import {BaseInput} from './base-input';
import {TextInputAdminComponent} from '../components/admin-input/text-input-admin/text-input-admin.component';

export class Textarea extends BaseInput{
  value: string;
  rows = 3;


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
  }

  adminComponent = TextInputAdminComponent;
}
