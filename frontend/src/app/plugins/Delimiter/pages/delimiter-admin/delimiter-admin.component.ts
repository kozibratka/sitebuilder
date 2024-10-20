import {Component, inject} from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {DelimiterConfigInterface} from "../../interfaces/delimiter-config-interface";
import {DelimiterComponent} from "../../components/delimiter/delimiter.component";
import {IconConfigInterface} from "../../../icon/interfaces/icon-config-interface";
import {AdminFormService} from "../../../shared/forms/admin-form.service";
import {pluginPosition} from "../../../shared/constants/plugin-position";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconInputComponent} from "../../../shared/components/inputs/image-inputs/icon-input/icon-input.component";
import {NgForOf} from "@angular/common";
import {ColorPickerModule} from "ngx-color-picker";

@Component({
  selector: 'app-delimiter-admin',
  standalone: true,
  imports: [
    FormsModule,
    IconInputComponent,
    NgForOf,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  templateUrl: './delimiter-admin.component.html',
  styleUrl: './delimiter-admin.component.css'
})
export class DelimiterAdminComponent extends AbstractAdminSetting<DelimiterConfigInterface, DelimiterComponent> {
  adminFormService = inject(AdminFormService);
  createAdminForm(settings: DelimiterConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        type: [null],
      },
      settings
    );
  }

  protected readonly positions = pluginPosition;
}
