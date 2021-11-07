import {Injectable} from '@angular/core';
import {MoveAbleSettingsComponent} from '../../move-able-settings.component';
import {SettingAbleInterface} from '../interfaces/setting-able-interface';
import {BasePlugSettingsinInterface} from '../../../../../plugins/tools/interfaces/base-plug-settingsin-interface';

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

  registerComponent(settingAbleInterface: SettingAbleInterface<BasePlugSettingsinInterface>): void {
    this.moveAbleSettingsComponent.registerComponent(settingAbleInterface);
  }
}
