import {FormControl} from '@angular/forms';

export abstract class BaseInput {
  label: string;
  helpText: string;
  name: string;
  abstract adminComponent;
  abstract createForm(): {[key: string]: FormControl} | {[key: string]: FormControl}[];
}
