import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../../abstract-class/abstract-admin-setting";
import {ImageConfigInterface} from "../../interfaces/image-config-interface";

@Component({
  selector: 'app-style-admin',
  templateUrl: './style-admin.component.html',
  styleUrls: ['./style-admin.component.css']
})
export class StyleAdminComponent extends AbstractAdminSetting<ImageConfigInterface> {
  createAdminForm(settings: ImageConfigInterface): void {

  }
}
