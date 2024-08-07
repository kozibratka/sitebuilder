import {BasePlugConfigInterface} from '../../shared/interfaces/base-plug-config-interface';
import {ImagesListInterface} from "../../shared/interfaces/images-list-interface";

export interface CarouselConfigInterface extends BasePlugConfigInterface, ImagesListInterface{
  autostart: boolean;
  intervalRotate: number;
}
