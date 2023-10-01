import {Component, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {TextInput} from '../../../../class/text-input';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-text-input-admin',
  templateUrl: './text-input-admin.component.html',
  styleUrls: ['./text-input-admin.component.css']
})
export class TextInputAdminComponent extends BaseAdminComponent<TextInput> implements OnInit{
  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.settings.name, [Validators.required]],
      helpText: [this.settings.helpText],
      label: [this.settings.label],
      required: [this.settings.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      Object.assign(this.settings, formValue);
    }
  }
}
