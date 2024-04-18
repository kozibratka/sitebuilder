import {PageBlockInterface} from './page-block-interface';
import {BasePlugConfigInterface} from '../../plugins/interfaces/base-plug-config-interface';

export interface PageInterface {
  id: number;
  name: string;
  pageBlocks: PageBlockInterface[];
  globalPlugins?: BasePlugConfigInterface[];
  url: string;
  homePage: boolean;
  webBlocks: PageBlockInterface[];
}
