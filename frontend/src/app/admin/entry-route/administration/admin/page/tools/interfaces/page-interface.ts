import {PageBlockInterface} from '../../page-builder/palette-builder/page-block/tools/interfaces/page-block-interface';
import {BasePlugConfigInterface} from '../../../../../../../plugins/tools/interfaces/base-plug-config-interface';

export interface PageInterface {
  id: number;
  name: string;
  pageBlocks: PageBlockInterface[];
  globalPlugins?: BasePlugConfigInterface[];
}
