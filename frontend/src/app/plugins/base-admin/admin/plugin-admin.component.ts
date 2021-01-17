import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {MenuLabel} from './tools/interfaces/menu-label';
import {MENU_LABELS} from './tools/injection-tokens/menu-label';
import {ModalForRouteComponent} from '../../../core/components/modal-for-route-component/modal-for-route.component';
import {PluginComponentInterface} from '../../../admin/entry-route/administration/admin/site-builder/page-builder/palette-builder/page-block/palette-item-component/tools/interfaces/plugin-component-interface';
import {FlashDataService} from '../../../core/services/flash-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './plugin-admin.component.html',
  styleUrls: ['./plugin-admin.component.css'],
  providers: [

  ]
})
export class PluginAdminComponent implements OnInit, AfterViewChecked {

  selectedComponent: PluginComponentInterface;
  menuSelected: string;

  constructor(
    @Inject('modalTitle') public modalTitle: string,
    @Inject(MENU_LABELS) public menuLabels: MenuLabel[],
    @Inject('defaultSelectedMenu') public defaultSelectedMenu: string,
    private modalForRouteComponent: ModalForRouteComponent,
    private flashData: FlashDataService<PluginComponentInterface>
  ) {
    this.menuSelected = defaultSelectedMenu;
  }

  ngOnInit(): void {
    this.modalForRouteComponent.title = this.modalTitle;
    this.modalForRouteComponent.schedulerShowModal = true;
    this.selectedComponent = this.flashData.get('selectedComponent');
  }

  ngAfterViewChecked(): void {


  }
}
