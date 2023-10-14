import { Component } from '@angular/core';
import {CarouselConfigInterface} from '../../interfaces/carousel-config-interface';
import {FormBuilder} from '@angular/forms';
import {AbstractAdminSetting} from '../../../../abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../../forms/admin-form.service';

@Component({
  selector: 'app-carousel-bootstrap-effect-admin',
  templateUrl: 'carousel-effect-admin.component.html',
  styleUrls: ['carousel-effect-admin.component.css']
})
export class CarouselEffectAdminComponent extends AbstractAdminSetting<CarouselConfigInterface> {

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
    super();
  }

  createAdminForm(settings: CarouselConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        intervalRotate: [''],
        autostart: ['']
      },
      settings
    );
  }

}
