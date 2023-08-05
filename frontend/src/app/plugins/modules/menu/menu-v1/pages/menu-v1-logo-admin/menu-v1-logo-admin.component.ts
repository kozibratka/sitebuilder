import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {MenuV1ConfigInterface} from '../../interfaces/menu-v1-config-interface';
import {AdminFormService} from '../../../../../forms/admin-form.service';
import {FileManagerService} from '../../../../../../core/modules/file-manager/services/file-manager.service';
import {FileManagerModalService} from '../../../../../../core/modules/file-manager/services/file-manager-modal.service';

@Component({
  selector: 'app-menu-v1-logo-admin',
  templateUrl: './menu-v1-logo-admin.component.html',
  styleUrls: ['./menu-v1-logo-admin.component.css']
})
export class MenuV1LogoAdminComponent extends AbstractAdminSetting<MenuV1ConfigInterface> {
  constructor(
    protected adminFormService: AdminFormService,
    private fileManagerService: FileManagerService,
    private fileManagerModalService: FileManagerModalService,
  ) {
    super();
  }

  createAdminForm(settings: MenuV1ConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        logoName: [''],
        logoImage: ['']
      },
      settings
    );
  }

  onClickAddImageButton() {
    this.fileManagerModalService.open('image').subscribe(value => {
      if (value.eventName === 'selected') {
        this.settings.logoImage = value.files[0]?.publicPath;
      }
    });
  }
}
