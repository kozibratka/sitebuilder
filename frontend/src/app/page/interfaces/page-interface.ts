import {BasePlugConfigInterface} from '../../plugins/tools/interfaces/base-plug-config-interface';
import {PageBlockInterface} from './page-block-interface';

export interface PageInterface {
  id: number;
  name: string;
  pageBlocks: PageBlockInterface[];
  globalPlugins?: BasePlugConfigInterface[];
}
