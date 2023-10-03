import {FormControl} from '@angular/forms';
import {BaseAdminComponent} from '../components/form-admin/admin-input/base-admin/base-admin.component';

export abstract class BaseInput {
  label: string;
  helpText: string;
  name: string;
  abstract getAdminComponent(): typeof BaseAdminComponent<any>;
  abstract createForm(): {[key: string]: any[]} | {[key: string]: any[]}[];
}
