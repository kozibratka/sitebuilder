import {MenuV1ItemInterface} from './menu-v1-item-interface';
import {BasePlugConfigInterface} from '../../../../interfaces/base-plug-config-interface';

export interface MenuV1ConfigInterface extends BasePlugConfigInterface {
  items: MenuV1ItemInterface[];
  logoImage: string;
  logoName: string;
}
