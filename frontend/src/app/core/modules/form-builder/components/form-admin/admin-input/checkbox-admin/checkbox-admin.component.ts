import {Component, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Checkbox} from '../../../../class/checkbox';
import {DialogComponent} from "../../../../../../components/dialog/dialog.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogClose} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-checkbox-admin',
  standalone: true,
  templateUrl: './checkbox-admin.component.html',
  imports: [
    CommonModule,
    DialogComponent,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatDialogClose
  ],
  styleUrls: ['./checkbox-admin.component.css']
})
export class CheckboxAdminComponent extends BaseAdminComponent<Checkbox> implements OnInit{
  form: FormGroup;
  ngOnInit(): void {
     this.form = this.fb.group({
       name: [this.settings.name, [Validators.required]],
      helpText: [this.settings.helpText],
       position: this.settings.position,
      label: [this.settings.label],
       options: this.fb.array(this.settings.options.map((option) => this.fb.group(
         {
           option: option.option,
           required: option.required,
         }
       )))
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
    this.options.push(this.fb.group({option: '', required: false}));
  }

  get options() {
    return this.form.get('options') as FormArray<FormGroup>;
  }
}
