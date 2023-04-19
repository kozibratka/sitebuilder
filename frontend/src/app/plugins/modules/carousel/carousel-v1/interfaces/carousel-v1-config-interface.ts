import {BasePlugConfigInterface} from '../../../../interfaces/base-plug-config-interface';

export interface CarouselV1ConfigInterface extends BasePlugConfigInterface{
  images: {path: string, h1: string, h2: string}[];
  autostart: boolean;
  intervalRotate: number;
}
