import { Component } from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {FileManagerService} from '../../../../core/modules/file-manager/services/file-manager.service';
import {FileManagerModalService} from '../../../../core/modules/file-manager/services/file-manager-modal.service';
import {FormService} from "../../../../core/services/form.service";
import {ReactiveFormsModule} from "@angular/forms";
import {
  ImageInputComponent
} from "../../../shared/components/inputs/image-inputs/image-input/image-input.component";

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
export class MenuLogoAdminComponent extends AbstractAdminSetting<MenuConfigInterface> {
  constructor(
    protected adminFormService: FormService,
    private fileManagerService: FileManagerService,
    private fileManagerModalService: FileManagerModalService,
  ) {
    super();
  }

  createAdminForm(settings: MenuConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        logoName: [''],
        logoImage: ['']
      },
      settings
    );
  }

  updateImage(path: string) {
    this.settings.logoImage = path;
  }
}
