import {BasePlugConfigInterface} from "../../../interfaces/base-plug-config-interface";

export interface ButtonConfigInterface extends BasePlugConfigInterface {
  label: string;
  externalUrl?: string;
  pageUrl?: string;
  pageId?: number,
  linkType?: number,
  type?: string
  position: string;
}
