import {BaseInput} from './base-input';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';
import {ButtonAdminComponent} from '../components/form-admin/admin-input/button-admin/button-admin.component';
export class Button extends BaseInput {

  position: 'left' | 'right';
  constructor() {
    super();
    this.label = 'Odeslat';
    this.helpText = '';
    this.position = 'right';
    // this.name = 'Tlačítko ' + StringService.randomString();
  }

  createForm(): { [p: string]: any[] } | { [p: string]: any[] }[] {
    return undefined;
  }

  getAdminComponent(): typeof BaseAdminComponent<any> {
    return ButtonAdminComponent;
  }


}
