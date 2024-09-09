import {BasePlugConfigInterface} from "../../shared/interfaces/base-plug-config-interface";

export interface VideoBackgroundConfigInterface extends BasePlugConfigInterface {
  videoPath: string;
  height: number;
  grayScale: number;
  opacity: number;
}
