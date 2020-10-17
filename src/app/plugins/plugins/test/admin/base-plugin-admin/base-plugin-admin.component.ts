import {Component, Injector, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../../../base-admin/base-admin.component';
import {ModalParametersMesseneger} from '../../../../../core/messengers/modal-for-route/modal-parameters-messeneger';

@Component({
  selector: 'app-base-plugin-admin',
  templateUrl: './base-plugin-admin.component.html',
  styleUrls: ['./base-plugin-admin.component.css']
})
export class BasePluginAdminComponent extends BaseAdminComponent {

  constructor(
    protected injector: Injector
  ) {
    super(injector);
  }

  getParanetersForModalAdmin(): ModalParametersMesseneger {
    const modalParametersMesseneger = new ModalParametersMesseneger();
    modalParametersMesseneger.title = 'Nastavení něčeho';
    return modalParametersMesseneger;
  }

}
