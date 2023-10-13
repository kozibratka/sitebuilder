import {Component, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {FormGroup, Validators} from '@angular/forms';
import {Button} from '../../../../class/button';

@Component({
  selector: 'app-button-admin',
  templateUrl: './button-admin.component.html',
  styleUrls: ['./button-admin.component.css']
})
export class ButtonAdminComponent extends BaseAdminComponent<Button> implements OnInit{
  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      // name: [this.settings.name, [Validators.required]],
      label: [this.settings.label],
      position: this.settings.position,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      Object.assign(this.settings, formValue);
    }
  }
}
