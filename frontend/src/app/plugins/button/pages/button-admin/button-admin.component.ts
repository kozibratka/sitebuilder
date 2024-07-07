import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {FormService} from "../../../../core/services/form.service";
import {FileManagerModalService} from "../../../../core/modules/file-manager/services/file-manager-modal.service";
import {ButtonConfigInterface} from "../../interfaces/button-config-interface";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {
  InputFormErrorDirective
} from "../../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {CommonModule} from "@angular/common";
import {pluginPosition} from "../../../shared/constants/plugin-position";

@Component({
  selector: 'app-buttom-admin',
  standalone: true,
  templateUrl: './button-admin.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFormErrorDirective
  ],
  styleUrls: ['./button-admin.component.css']
})
export class ButtonAdminComponent extends AbstractAdminSetting<ButtonConfigInterface> {
  positions = pluginPosition;
  types = ['btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark', 'btn-link'];
  constructor(
    protected adminFormService: FormService,
    private fileManagerModalService: FileManagerModalService,
  ) {
    super();
  }
  createAdminForm(settings: ButtonConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        position: [null],
        label: [null, Validators.required],
        type: [null],
      },
      settings
    );
  }

}
