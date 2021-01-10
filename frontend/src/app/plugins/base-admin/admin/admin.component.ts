import {AfterViewChecked, Component, Inject, Input, OnInit} from '@angular/core';
import {MenuLabel} from './tools/interfaces/menu-label';
import {MENU_LABELS} from './tools/injection-tokens/menu-label';
import {ModalForRouteComponent} from '../../../core/components/modal-for-route-component/modal-for-route.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [

  ]
})
export class AdminComponent implements OnInit, AfterViewChecked {

  private pluginAdminChanged = false;

  constructor(
    @Inject(MENU_LABELS) private menuLabels: MenuLabel[],
    @Inject('modalTitle') public modalTitle: string,
    private modalForRouteComponent: ModalForRouteComponent
  ) {
  }

  ngOnInit(): void {
    this.modalForRouteComponent.title = this.modalTitle;
    this.modalForRouteComponent.schedulerShowModal = true;
  }

  ngAfterViewChecked(): void {
  }



}
