import { Component } from '@angular/core';
import {ImageConfigInterface} from '../../interfaces/image-config-interface';
import {AbstractAdminSetting} from '../../../../abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../../forms/admin-form.service';
import {FileManagerService} from '../../../../../core/modules/file-manager/services/file-manager.service';
import {FileManagerModalService} from '../../../../../core/modules/file-manager/services/file-manager-modal.service';

@Component({
  selector: 'app-image-v1-admin',
  templateUrl: 'image-admin.component.html',
  styleUrls: ['image-admin.component.css']
})
export class ImageAdminComponent extends AbstractAdminSetting<ImageConfigInterface> {
  constructor(
    protected adminFormService: AdminFormService,
    private fileManagerService: FileManagerService,
    private fileManagerModalService: FileManagerModalService,
  ) {
    super();
  }
  createAdminForm(settings: ImageConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        imagePath: [''],
      },
      settings
    );
  }

  onClickAddImageButton() {
    this.fileManagerModalService.open('image').subscribe(value => {
      if (value.eventName === 'selected') {
        this.settings.imagePath = value.files[0]?.publicPath;
      }
    });
  }
}
