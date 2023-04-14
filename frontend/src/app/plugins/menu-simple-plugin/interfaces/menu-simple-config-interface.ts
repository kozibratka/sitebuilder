import {BasePlugConfigInterface} from '../../tools/interfaces/base-plug-config-interface';
import {MenuItemInterface} from './menu-item-interface';

export interface MenuSimpleConfigInterface extends BasePlugConfigInterface {
  menuSimpleItems: MenuItemInterface[];
}
