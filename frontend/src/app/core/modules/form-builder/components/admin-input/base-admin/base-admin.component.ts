import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BaseInput} from '../../../class/base-input';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.css']
})
export class BaseAdminComponent<T extends BaseInput> {
  settings: T;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: T,
    protected fb: FormBuilder,
  ) {
    this.settings = data;
  }
}
