import {Component, Input, OnInit} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';
import * as _ from 'underscore';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-public',
  templateUrl: './form-public.component.html',
  styleUrls: ['./form-public.component.css']
})
export class FormPublicComponent implements OnInit{
  @Input() formData: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
  form: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    const flatFormData = _.flatten(this.formData);
    const formControls = [];
    flatFormData.forEach((data: BaseInput) => {
      const form = data.createForm();
      if (Array.isArray(form)) {
        formControls.push(...form);
      } else {
        formControls.push(form);
      }
    });
    this.form = this.fb.group(
      {...formControls}
    );
  }
}
