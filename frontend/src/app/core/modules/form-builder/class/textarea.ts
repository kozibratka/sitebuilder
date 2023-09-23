import {BaseInput} from './base-input';

export class Textarea extends BaseInput{
  value: string;
  rows = 3;


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
  }
}
