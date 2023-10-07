import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {FormV1ConfigInterface} from '../../interfaces/form-v1-config-interface';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';
import {TextInput} from '../../../../../../core/modules/form-builder/class/text-input';
import {FormBuilder} from '@angular/forms';
import * as _ from 'underscore';
import {BaseInput} from '../../../../../../core/modules/form-builder/class/base-input';
import {FormPublicComponent} from '../../../../../../core/modules/form-builder/components/form-public/form-public/form-public.component';
import {Checkbox} from '../../../../../../core/modules/form-builder/class/checkbox';
import {Selectbox} from '../../../../../../core/modules/form-builder/class/selectbox';
import {Textarea} from '../../../../../../core/modules/form-builder/class/textarea';

@Component({
  selector: 'app-form-v1',
  templateUrl: './form-v1.component.html',
  styleUrls: ['./form-v1.component.css']
})
export class FormV1Component extends AbstractPlugin<FormV1ConfigInterface> implements OnInit{

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

  initEmptySettings(): FormV1ConfigInterface {
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
      value.map(value1 => {
        let instance: BaseInput = null;
        if (value1.type === Checkbox.constructor.name) {
          instance = new Checkbox();
        } else if (value1.type === Selectbox.constructor.name) {
          instance = new Selectbox();
        } else if (value1.type === TextInput.constructor.name) {
          instance = new TextInput();
        }else if (value1.type === Textarea.constructor.name) {
          instance = new Textarea();
        }
        if (instance) {
          Object.assign(instance, value1);
        }
      });
    });
    Object.assign(this.settings.form, newInstances);
  }

}
