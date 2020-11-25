import {Component, Injector, OnInit} from '@angular/core';
import {ModalForRouteComponent} from '../../core/components/modal-for-route-component/modal-for-route.component';
import {ModalParametersMesseneger} from '../../core/components/modal-for-route-component/tools/messengers/modal-for-route/modal-parameters-messeneger';

@Component({
  selector: 'app-base-admin',
  template: '',
})
export abstract class BaseAdminComponent implements OnInit {


  constructor(
    protected injector: Injector
  ) {

  }

  ngOnInit(): void {
    this.injector.get(ModalForRouteComponent).schedulerShowModal = this.getParanetersForModalAdmin();
  }

  abstract getParanetersForModalAdmin(): ModalParametersMesseneger;

}
