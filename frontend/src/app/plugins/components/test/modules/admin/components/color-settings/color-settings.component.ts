import {Component, Injector, OnInit} from '@angular/core';
import {ModalParametersMesseneger} from '../../../../../../../core/components/modal-for-route/tools/messengers/modal-for-route/modal-parameters-messeneger';
import {BasePluginAdminComponent} from '../base-plugin-admin/base-plugin-admin.component';

@Component({
  selector: 'app-color-settings',
  templateUrl: './color-settings.component.html',
  styleUrls: ['./color-settings.component.css']
})
export class ColorSettingsComponent extends BasePluginAdminComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getParanetersForModalAdmin(): ModalParametersMesseneger {
    const modalParametersMesseneger = super.getParanetersForModalAdmin();
    modalParametersMesseneger.title = 'Nastavení něčeho';
    return modalParametersMesseneger;
  }

}
