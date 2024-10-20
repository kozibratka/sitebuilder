import {BasePlugConfigInterface} from "../../shared/interfaces/base-plug-config-interface";
import {LinkAblePluginInterface} from "../../shared/interfaces/link-able-plugin-interface";

export interface DelimiterConfigInterface extends BasePlugConfigInterface, LinkAblePluginInterface {
  type: "v1"|"v2"|"v3"|"v4"|"v5"|"v6"|"v7"|"v8";
  color?: string;
}
