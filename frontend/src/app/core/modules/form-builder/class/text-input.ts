import {BaseInput} from './base-input';

export class TextInput extends BaseInput{
  value: string;


  constructor() {
    super();
    this.label = 'Název';
    this.helpText = 'Nápověda';
  }
}
