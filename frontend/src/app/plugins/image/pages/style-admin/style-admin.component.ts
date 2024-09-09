import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {ImageConfigInterface} from "../../interfaces/image-config-interface";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {ImageComponent} from "../../components/image/image.component";

@Component({
  selector: 'app-style-admin',
  standalone: true,
  templateUrl: './style-admin.component.html',
  imports: [
    MatSlider,
    MatSliderThumb,
    FormsModule
  ],
  styleUrls: ['./style-admin.component.css']
})
export class StyleAdminComponent extends AbstractAdminSetting<ImageConfigInterface, ImageComponent> {
  createAdminForm(settings: ImageConfigInterface): void {

  }
}
