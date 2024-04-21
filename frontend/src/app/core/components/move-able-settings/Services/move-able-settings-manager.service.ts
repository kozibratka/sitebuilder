import {Injectable} from '@angular/core';
import {MoveAbleSettingsComponent} from '../move-able-settings.component';
import {SettingAbleInterface} from '../interfaces/setting-able-interface';
import {BasePlugConfigInterface} from '../../../../plugins/interfaces/base-plug-config-interface';

@Injectable({
  providedIn: 'root'
})
export class MoveAbleSettingsManagerService {

  moveAbleSettingsComponent: MoveAbleSettingsComponent;

  constructor() {
  }

  registerSettingsComponent(moveAbleSettingsComponent: MoveAbleSettingsComponent): void {
    this.moveAbleSettingsComponent = moveAbleSettingsComponent;
  }

  registerComponent(settingAbleInterface: SettingAbleInterface<BasePlugConfigInterface>): void {
    this.moveAbleSettingsComponent.registerComponent(settingAbleInterface);
  }
}
