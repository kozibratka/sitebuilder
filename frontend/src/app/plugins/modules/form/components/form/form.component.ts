import {Component, OnInit, ViewChild} from '@angular/core';
import {FormConfigInterface} from '../../interfaces/form-config-interface';
import {FormBuilder} from '@angular/forms';
import {FormPublicComponent} from '../../../../../core/modules/form-builder/components/form-public/form-public/form-public.component';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {TextInput} from '../../../../../core/modules/form-builder/class/text-input';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {Checkbox} from '../../../../../core/modules/form-builder/class/checkbox';
import {Selectbox} from '../../../../../core/modules/form-builder/class/selectbox';
import {Textarea} from '../../../../../core/modules/form-builder/class/textarea';
import {Button} from '../../../../../core/modules/form-builder/class/button';
import {BaseInput} from '../../../../../core/modules/form-builder/class/base-input';

@Component({
  selector: 'app-form-v1',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent extends AbstractPlugin<FormConfigInterface> implements OnInit{

  @ViewChild(FormPublicComponent, {static: true}) formBuilderPublic: FormPublicComponent;

  form;
  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.settings.id) {
      this.inputsToInstance();
    }
  }

  initEmptySettings(): FormConfigInterface {
    return {
      identifier: PluginIdentifier.FORM_V1,
      form: [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]],
    };
  }

  getDisabledStateWhenDraggingItem(): any {
  }

  refreshView(): void {
    this.formBuilderPublic.refresh();
  }

  inputsToInstance() {
    const newInstances = this.settings.form.map(value => {
      return value.map(value1 => {
        let instance: BaseInput = null;
        if (value1.type === 'Checkbox') {
          instance = new Checkbox();
        } else if (value1.type === 'Selectbox') {
          instance = new Selectbox();
        } else if (value1.type === 'TextInput') {
          instance = new TextInput();
        }else if (value1.type === 'Textarea') {
          instance = new Textarea();
        }else if (value1.type === 'Button') {
          instance = new Button();
        }
        if (instance) {
          Object.assign(instance, value1);
        }
        return instance;
      });
    });
    Object.assign(this.settings.form, newInstances);
  }

  formSubmitted(data: any) {
    console.log(data);
  }

}
