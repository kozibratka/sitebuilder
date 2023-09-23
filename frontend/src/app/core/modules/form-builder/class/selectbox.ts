import {BaseInput} from './base-input';

export class Selectbox extends BaseInput{
  options: string[];


  constructor() {
    super();
    this.options = ['možnost 1', 'možnost 2', 'možnost 3'];
    this.label = 'Název';
    this.helpText = 'Nápověda';
  }
}
