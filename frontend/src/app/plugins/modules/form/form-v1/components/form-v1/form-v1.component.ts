import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {FormV1ConfigInterface} from '../../interfaces/form-v1-config-interface';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';
import {TextInput} from '../../../../../../core/modules/form-builder/class/text-input';
import {FormBuilder} from '@angular/forms';
import * as _ from 'underscore';
import {BaseInput} from '../../../../../../core/modules/form-builder/class/base-input';
import {FormPublicComponent} from '../../../../../../core/modules/form-builder/components/form-public/form-public/form-public.component';

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

}
