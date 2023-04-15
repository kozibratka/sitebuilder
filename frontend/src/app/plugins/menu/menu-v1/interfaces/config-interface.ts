import {ItemInterface} from './item-interface';
import {BasePlugConfigInterface} from '../../../tools/interfaces/base-plug-config-interface';

export interface ConfigInterface extends BasePlugConfigInterface {
  menuSimpleItems: ItemInterface[];
}
