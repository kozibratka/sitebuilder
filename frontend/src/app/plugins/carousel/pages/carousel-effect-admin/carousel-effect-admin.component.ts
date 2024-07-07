import { Component } from '@angular/core';
import {CarouselConfigInterface} from '../../interfaces/carousel-config-interface';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {FormService} from "../../../../core/services/form.service";

@Component({
  selector: 'app-carousel-bootstrap-effect-admin',
  standalone: true,
  templateUrl: 'carousel-effect-admin.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['carousel-effect-admin.component.css']
})
export class CarouselEffectAdminComponent extends AbstractAdminSetting<CarouselConfigInterface> {

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: FormService
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
