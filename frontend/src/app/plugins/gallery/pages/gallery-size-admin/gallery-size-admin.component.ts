import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {GalleryConfigInterface} from "../../interfaces/gallery-config-interface";
import {FormService} from "../../../../core/services/form.service";
import {
  InputFormErrorDirective
} from "../../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {NgForOf} from "@angular/common";
import {GalleryComponent} from "../../components/gallery/gallery.component";

@Component({
  selector: 'app-gallery-size-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputFormErrorDirective,
    NgForOf
  ],
  templateUrl: './gallery-size-admin.component.html',
  styleUrl: './gallery-size-admin.component.css'
})
export class GallerySizeAdminComponent extends AbstractAdminSetting<GalleryConfigInterface, GalleryComponent> {
  constructor(
    protected fb: FormBuilder,
    protected adminFormService: FormService
  ) {
    super();
  }

  createAdminForm(settings: GalleryConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        thumbnailHeight: [''],
      },
      settings
    );
  }
}
