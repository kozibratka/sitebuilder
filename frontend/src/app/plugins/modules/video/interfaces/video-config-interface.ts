import {BasePlugConfigInterface} from '../../../interfaces/base-plug-config-interface';

export interface VideoConfigInterface extends BasePlugConfigInterface {
  videoPath: string;
  height?: number;
}
