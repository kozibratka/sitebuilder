import { Component } from '@angular/core';
import {ImageConfigInterface} from '../../interfaces/image-config-interface';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../shared/forms/admin-form.service';
import {FileManagerModalService} from '../../../../core/modules/file-manager/services/file-manager-modal.service';
import {FormService} from "../../../../core/services/form.service";
import {ReactiveFormsModule} from "@angular/forms";
import {
  ImageInputComponent
} from "../../../shared/components/inputs/image-inputs/image-input/image-input.component";

@Component({
  selector: 'app-image-v1-admin',
  standalone: true,
  templateUrl: 'image-admin.component.html',
  imports: [
    ReactiveFormsModule,
    ImageInputComponent
  ],
  styleUrls: ['image-admin.component.css']
})
export class ImageAdminComponent extends AbstractAdminSetting<ImageConfigInterface> {
  constructor(
    protected adminFormService: FormService,
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
  updateImage(path: string) {
    this.settings.imagePath = path;
  }
}
