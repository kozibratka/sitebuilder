import {PageBlockInterface} from './page-block-interface';
import {BasePlugConfigInterface} from '../../plugins/shared/interfaces/base-plug-config-interface';
import {PageBlockAssignmentInterface} from "./page-block-assignment-interface";

export interface PageInterface {
  id: number;
  name: string;
  pageBlockAssignments: PageBlockAssignmentInterface[];
  globalPlugins?: BasePlugConfigInterface[];
  url: string;
  homePage: boolean;
  webBlocks: PageBlockInterface[];
}
