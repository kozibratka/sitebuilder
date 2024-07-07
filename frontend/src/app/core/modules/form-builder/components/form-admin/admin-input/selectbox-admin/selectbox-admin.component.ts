import {Component, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Selectbox} from '../../../../class/selectbox';
import {DialogComponent} from "../../../../../../components/dialog/dialog.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogClose} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-selectbox-admin',
  standalone: true,
  templateUrl: './selectbox-admin.component.html',
  imports: [
    CommonModule,
    DialogComponent,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatDialogClose
  ],
  styleUrls: ['./selectbox-admin.component.css']
})
export class SelectboxAdminComponent extends BaseAdminComponent<Selectbox> implements OnInit{
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
