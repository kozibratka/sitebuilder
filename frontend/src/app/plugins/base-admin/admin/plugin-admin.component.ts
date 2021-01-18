import {AfterViewChecked, Component, DoCheck, Inject, OnInit} from '@angular/core';
import {MenuLabel} from './tools/interfaces/menu-label';
import {MENU_LABELS} from './tools/injection-tokens/menu-label';
import {ModalForRouteComponent} from '../../../core/components/modal-for-route-component/modal-for-route.component';
import {PluginComponentInterface} from '../../../admin/entry-route/administration/admin/site-builder/page-builder/palette-builder/page-block/palette-item-component/tools/interfaces/plugin-component-interface';
import {FlashDataService} from '../../../core/services/flash-data.service';
import {BaseAdminAbstractComponent} from '../../tools/components/base-admin-abstract.component';
import {AbstractPluginComponent} from '../../tools/abstract-class/abstract-plugin-component';
import {InputFormErrorGrouperDirective} from '../../../core/directives/form-error/input-form-error-grouper.directive';

@Component({
  selector: 'app-admin',
  templateUrl: './plugin-admin.component.html',
  styleUrls: ['./plugin-admin.component.css'],
  providers: [

  ]
})
export class PluginAdminComponent implements OnInit, AfterViewChecked, DoCheck {

  selectedComponent: PluginComponentInterface;
  menuSelected: string;
  pluginAdmin: BaseAdminAbstractComponent<AbstractPluginComponent<any>>;

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

  ngDoCheck(): void {
    if (this.pluginAdmin) {
      this.switchToMenuBasedOnErrorFromForm();
    }
  }

  switchToMenuBasedOnErrorFromForm(): void {
    const inputFormErrorGrouperDirectives = this.pluginAdmin.inputFormErrorGrouperDirectives;
    loop1:
    for (const directive of inputFormErrorGrouperDirectives) {
      if (directive.hasError) {
        for (const menuLabel of this.menuLabels) {
          if (menuLabel.identifier === directive.groupeName) {
            this.menuSelected = menuLabel.identifier;
            break loop1;
          }
        }
      }
    }
  }

  public onRouterOutletActivate(pluginAdmin: BaseAdminAbstractComponent<AbstractPluginComponent<any>>): void {
    this.pluginAdmin = pluginAdmin;
  }

}
