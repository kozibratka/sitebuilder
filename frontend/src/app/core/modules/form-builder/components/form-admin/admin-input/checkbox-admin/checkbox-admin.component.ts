import {Component, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {Checkbox} from '../../../../class/checkbox';

@Component({
  selector: 'app-checkbox-admin',
  templateUrl: './checkbox-admin.component.html',
  styleUrls: ['./checkbox-admin.component.css']
})
export class CheckboxAdminComponent extends BaseAdminComponent<Checkbox> implements OnInit{
  form: FormGroup;
  ngOnInit(): void {
     this.form = this.fb.group({
       name: [this.settings.name, [Validators.required]],
      helpText: [this.settings.helpText],
      label: [this.settings.label],
       options: this.fb.array(this.settings.options.map((option: string) => this.fb.control(option)))
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      Object.assign(this.settings, formValue);
    }
  }
  removeOption(index: number) {
    (this.form.get('options') as FormArray).removeAt(index);
  }
  addOption() {
    (this.form.get('options') as FormArray).push(this.fb.control(''));
  }

  get options() {
    return this.form.get('options') as FormArray;
  }
}
