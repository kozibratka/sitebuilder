import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {MapConfigInterface} from "../../interfaces/map-config-interface";
import {FormService} from "../../../../core/services/form.service";
import {pluginPosition} from "../../../shared/constants/plugin-position";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  InputFormErrorDirective
} from "../../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {NgForOf} from "@angular/common";
import {IconInputComponent} from "../../../shared/components/inputs/image-inputs/icon-input/icon-input.component";

@Component({
  selector: 'app-icon-admin',
  standalone: true,
  imports: [
    FormsModule,
    InputFormErrorDirective,
    NgForOf,
    ReactiveFormsModule,
    IconInputComponent
  ],
  templateUrl: './map-admin.component.html',
  styleUrl: './map-admin.component.css'
})
export class MapAdminComponent extends AbstractAdminSetting<MapConfigInterface> {
  positions = pluginPosition;
  constructor(
    protected adminFormService: FormService,
  ) {
    super();
  }

  createAdminForm(settings: MapConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        height: [null],
        lat: [null],
        lng: [null],
        title: [null],
      },
      settings
    );
  }
}
