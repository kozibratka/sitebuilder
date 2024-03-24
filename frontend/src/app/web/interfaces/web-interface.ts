import {BasePlugConfigInterface} from '../../plugins/interfaces/base-plug-config-interface';

export interface WebInterface {
  id: number;
  name: string;
  plugins: BasePlugConfigInterface[];
  pages: {id: number, name: string}[];
  parent?: number;
}
