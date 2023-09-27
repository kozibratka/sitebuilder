import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {ImageV1ConfigInterface} from '../../interfaces/image-v1-config-interface';
import {AdminFormService} from '../../../../../forms/admin-form.service';
import {FileManagerService} from '../../../../../../core/modules/file-manager/services/file-manager.service';
import {FileManagerModalService} from '../../../../../../core/modules/file-manager/services/file-manager-modal.service';

@Component({
  selector: 'app-image-v1-admin',
  templateUrl: './image-v1-admin.component.html',
  styleUrls: ['./image-v1-admin.component.css']
})
export class ImageV1AdminComponent extends AbstractAdminSetting<ImageV1ConfigInterface> {
  constructor(
    protected adminFormService: AdminFormService,
    private fileManagerService: FileManagerService,
    private fileManagerModalService: FileManagerModalService,
  ) {
    super();
  }
  createAdminForm(settings: ImageV1ConfigInterface): void {
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
