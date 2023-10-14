import { Component } from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {AbstractAdminSetting} from '../../../../abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../../forms/admin-form.service';
import {FileManagerService} from '../../../../../core/modules/file-manager/services/file-manager.service';
import {FileManagerModalService} from '../../../../../core/modules/file-manager/services/file-manager-modal.service';

@Component({
  selector: 'app-menu-v1-logo-admin',
  templateUrl: 'menu-logo-admin.component.html',
  styleUrls: ['menu-logo-admin.component.css']
})
export class MenuLogoAdminComponent extends AbstractAdminSetting<MenuConfigInterface> {
  constructor(
    protected adminFormService: AdminFormService,
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

  onClickAddImageButton() {
    this.fileManagerModalService.open('image').subscribe(value => {
      if (value.eventName === 'selected') {
        this.settings.logoImage = value.files[0]?.publicPath;
      }
    });
  }
}
