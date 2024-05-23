import {FormControl} from '@angular/forms';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';

export abstract class BaseInput {
  label: string;
  helpText: string;
  name: string;
  type: string = this.constructor.name; // for json decode
  settings?: any;
  abstract getAdminComponent(): typeof BaseAdminComponent<any>;
  abstract createForm(): any;
}
