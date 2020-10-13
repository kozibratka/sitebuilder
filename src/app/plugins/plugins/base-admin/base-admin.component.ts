import {Component, Injector, OnInit} from '@angular/core';
import {ModalForRouteComponent} from '../../../admin/shared/modal-for-route/modal-for-route.component';

@Component({
  selector: 'app-base-admin',
  template: '',
})
export class BaseAdminComponent implements OnInit {


  constructor(
    protected injector: Injector
  ) {

  }

  ngOnInit(): void {
    this.injector.get(ModalForRouteComponent).schedulerShowModal = true;
  }

}
