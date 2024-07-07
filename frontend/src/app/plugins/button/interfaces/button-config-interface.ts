import {BasePlugConfigInterface} from "../../shared/interfaces/base-plug-config-interface";
import {LinkAblePluginInterface} from "../../shared/interfaces/link-able-plugin-interface";

export interface ButtonConfigInterface  extends BasePlugConfigInterface, LinkAblePluginInterface {
  label: string;
  externalUrl?: string;
  type?: string;
  position: string;
  targetBlank: boolean;
}
