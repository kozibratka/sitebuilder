import {ItemInterface} from './item-interface';
import {BasePlugConfigInterface} from '../../../../interfaces/base-plug-config-interface';

export interface ConfigInterface extends BasePlugConfigInterface {
  items: ItemInterface[];
}
