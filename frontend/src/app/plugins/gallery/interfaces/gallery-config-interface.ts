import {BasePlugConfigInterface} from '../../shared/interfaces/base-plug-config-interface';
import {ImagesListInterface} from "../../shared/interfaces/images-list-interface";

export interface GalleryConfigInterface extends BasePlugConfigInterface, ImagesListInterface{
  thumbnailHeight: number;

}
