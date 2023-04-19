import { Component } from '@angular/core';
import {CarouselV1ConfigInterface} from '../../interfaces/carousel-v1-config-interface';
import {FormBuilder} from '@angular/forms';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../../../forms/admin-form.service';

@Component({
  selector: 'app-carousel-bootstrap-effect-admin',
  templateUrl: './carousel-v1-effect-admin.component.html',
  styleUrls: ['./carousel-v1-effect-admin.component.css']
})
export class CarouselV1EffectAdminComponent extends AbstractAdminSetting<CarouselV1ConfigInterface> {

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
    super();
  }

  createAdminForm(settings: CarouselV1ConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        intervalRotate: [''],
        autostart: ['']
      },
      settings
    );
  }

}
