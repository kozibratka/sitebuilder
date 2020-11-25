import {Component, Injector, OnInit} from '@angular/core';
import {BasePluginAdminComponent} from '../base-plugin-admin/base-plugin-admin.component';
import {ModalParametersMesseneger} from '../../../../../core/components/modal-for-route-component/tools/messengers/modal-for-route/modal-parameters-messeneger';

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
