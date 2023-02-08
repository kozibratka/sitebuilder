import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {CarouselBootstrapConfigInterface} from '../../interfaces/carousel-bootstrap-config-interface';
import {FormBuilder} from '@angular/forms';
import {AdminFormService} from '../../../tools/forms/admin-form.service';

@Component({
  selector: 'app-carousel-bootstrap-effect-admin',
  templateUrl: './effect-admin.component.html',
  styleUrls: ['./effect-admin.component.css']
})
export class EffectAdminComponent extends AbstractAdminSetting<CarouselBootstrapConfigInterface> {

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
    super();
  }

  createAdminForm(settings: CarouselBootstrapConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        interval: [''],
        autostart: ['']
      },
      settings
    );
  }

}
