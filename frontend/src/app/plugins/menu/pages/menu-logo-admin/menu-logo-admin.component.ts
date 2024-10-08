import { Component } from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {FormService} from "../../../../core/services/form.service";
import {ReactiveFormsModule} from "@angular/forms";
import {
  ImageInputComponent
} from "../../../shared/components/inputs/image-inputs/image-input/image-input.component";
import {MenuComponent} from "../../components/menu/menu.component";

@Component({
  selector: 'app-menu-v1-logo-admin',
  standalone: true,
  templateUrl: 'menu-logo-admin.component.html',
  imports: [
    ReactiveFormsModule,
    ImageInputComponent
  ],
  styleUrls: ['menu-logo-admin.component.css']
})
export class MenuLogoAdminComponent extends AbstractAdminSetting<MenuConfigInterface, MenuComponent> {
  constructor(
    protected adminFormService: FormService,
  ) {
    super();
  }

  createAdminForm(settings: MenuConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        logoName: [''],
      },
      settings
    );
  }

  updateImage(path: string) {
    this.settings.logoImage = path;
  }
}
