import {BasePlugConfigInterface} from '../../tools/interfaces/base-plug-config-interface';

export interface CarouselBootstrapConfigInterface extends BasePlugConfigInterface{
  images: {path: string, h1: string, h2: string}[];
  auto: boolean;
  timer: number;
}
