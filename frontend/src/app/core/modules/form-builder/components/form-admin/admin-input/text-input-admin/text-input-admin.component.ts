import {Component, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {TextInput} from '../../../../class/text-input';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogComponent} from "../../../../../../components/dialog/dialog.component";
import {MatDialogClose} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-text-input-admin',
  standalone: true,
  templateUrl: './text-input-admin.component.html',
  imports: [
    CommonModule,
    DialogComponent,
    ReactiveFormsModule,
    MatDialogClose
  ],
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
