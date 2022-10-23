import {BasePlugConfigInterface} from '../../../../../plugins/tools/interfaces/base-plug-config-interface';

export interface WebInterface {
  id: number;
  name: string;
  plugins: BasePlugConfigInterface[];
}
