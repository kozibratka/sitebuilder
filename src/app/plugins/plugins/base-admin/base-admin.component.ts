import {Component, Injector, OnInit} from '@angular/core';
import {COMPONENT_CREATED_NOTIFIER} from '../../../admin/shared/modal-for-route/injection-tokens/component-created-notifier';

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
    this.injector.get(COMPONENT_CREATED_NOTIFIER).next(true);
  }

}
