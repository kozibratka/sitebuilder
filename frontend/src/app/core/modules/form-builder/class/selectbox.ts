import {BaseInput} from './base-input';
import {SelectboxAdminComponent} from '../components/admin-input/selectbox-admin/selectbox-admin.component';
import {StringService} from '../../../services/string.service';

export class Selectbox extends BaseInput{
  options: string[];


  constructor() {
    super();
    this.options = ['možnost 1', 'možnost 2', 'možnost 3'];
    this.label = 'Název';
    this.helpText = 'Nápověda';
    this.name = 'select ' + StringService.randomString();
  }

  adminComponent = SelectboxAdminComponent;
}
