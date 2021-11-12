import {GridStackNode} from 'gridstack/dist/gridstack';

export interface PaletteItemConfig extends GridStackNode{
  plugin: {identifier: string};
}
