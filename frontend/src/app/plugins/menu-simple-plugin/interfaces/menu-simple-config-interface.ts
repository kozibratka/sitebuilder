import {BasePlugConfigInterface} from '../../tools/interfaces/base-plug-config-interface';

export interface MenuSimpleConfigInterface extends BasePlugConfigInterface {
  items: {name: string, idPage: number, level: number}[];
}
