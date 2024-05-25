import {Injectable} from '@angular/core';
import {BaseInput} from "../class/base-input";
import {Checkbox} from "../class/checkbox";
import {Selectbox} from "../class/selectbox";
import {TextInput} from "../class/text-input";
import {Textarea} from "../class/textarea";
import {Button} from "../class/button";
import {ObjectHelper} from "../../../helpers/object-helper";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  createInputsFromRaw(inputs: BaseInput[][]) {
    return inputs.map(value => {
      return value.map(value1 => {
        let instance: BaseInput = null;
        if (value1.type === 'Checkbox') {
          instance = new Checkbox();
        } else if (value1.type === 'Selectbox') {
          instance = new Selectbox();
        } else if (value1.type === 'TextInput') {
          instance = new TextInput();
        } else if (value1.type === 'Textarea') {
          instance = new Textarea();
        } else if (value1.type === 'Button') {
          instance = new Button();
        }
        if (instance) {
          Object.assign(instance, value1);
          instance.settings = value1;
        }
        return instance;
      });
    });
  }
}
