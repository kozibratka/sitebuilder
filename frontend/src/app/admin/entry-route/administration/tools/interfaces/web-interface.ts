import {BasePlugSettingsinInterface} from '../../../../../plugins/tools/interfaces/base-plug-settingsin-interface';

export interface WebInterface {
  id: number;
  name: string;
  plugins: BasePlugSettingsinInterface[];
}
