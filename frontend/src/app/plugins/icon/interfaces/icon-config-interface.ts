import {BasePlugConfigInterface} from "../../shared/interfaces/base-plug-config-interface";
import {LinkAblePluginInterface} from "../../shared/interfaces/link-able-plugin-interface";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {IconName} from "@fortawesome/fontawesome-common-types";

export interface IconConfigInterface  extends BasePlugConfigInterface, LinkAblePluginInterface {
  icon: IconName;
  position: string;
  size: SizeProp;
}
