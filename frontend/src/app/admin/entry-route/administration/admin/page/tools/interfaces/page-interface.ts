import {PageBlockInterface} from '../../page-builder/palette-builder/page-block/tools/interfaces/page-block-interface';

export interface PageInterface {
  id: number;
  name: string;
  pageBlocks: PageBlockInterface[];
}
