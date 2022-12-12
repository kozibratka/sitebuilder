import {FormGroup} from '@angular/forms';

export interface SettingAbleInterface {
  settings: any;
  adminForm: FormGroup;
  submit(): void;
}
