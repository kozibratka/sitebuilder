import {GridStackNode} from 'gridstack/dist/gridstack';
import {BasePlugConfigInterface} from '../../plugins/interfaces/base-plug-config-interface';

export interface PaletteItemConfig extends GridStackNode{
  plugin: BasePlugConfigInterface;
  diffGridAndContentBottomHeightPx?: number;
  height?: number;
}
