import {BasePlugConfigInterface} from "../../shared/interfaces/base-plug-config-interface";

export interface MapConfigInterface extends BasePlugConfigInterface {
  lat: number;
  lng: number;
  height: number;
  title: string;
}
