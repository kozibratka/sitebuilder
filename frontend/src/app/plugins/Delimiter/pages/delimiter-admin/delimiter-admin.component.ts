import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {DelimiterConfigInterface} from "../../interfaces/delimiter-config-interface";
import {DelimiterComponent} from "../../components/delimiter/delimiter.component";
import {IconConfigInterface} from "../../../icon/interfaces/icon-config-interface";

@Component({
  selector: 'app-delimiter-admin',
  standalone: true,
  imports: [],
  templateUrl: './delimiter-admin.component.html',
  styleUrl: './delimiter-admin.component.css'
})
export class DelimiterAdminComponent extends AbstractAdminSetting<DelimiterConfigInterface, DelimiterComponent> {
  createAdminForm(settings: DelimiterConfigInterface): void {
    // this.adminForm = this.adminFormService.createForm(
    //   {
    //     position: [null],
    //     size: [null],
    //   },
    //   settings
    // );
  }
}
