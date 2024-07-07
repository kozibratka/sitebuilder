import {BasePlugConfigInterface} from '../../shared/interfaces/base-plug-config-interface';

export interface ImageConfigInterface extends BasePlugConfigInterface {
  imagePath: string;
  circle: number;
  blur: number;
  grayscale: number;
  sepia: number;
}
