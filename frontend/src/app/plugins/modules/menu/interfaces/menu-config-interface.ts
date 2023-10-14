import {MenuItemInterface} from './menu-item-interface';
import {BasePlugConfigInterface} from '../../../interfaces/base-plug-config-interface';

export interface MenuConfigInterface extends BasePlugConfigInterface {
  items: MenuItemInterface[];
  logoImage: string;
  logoName: string;
}
