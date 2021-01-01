import {GridStackNode} from 'gridstack/dist/gridstack';

export interface PaletteGridItemInterface extends GridStackNode{
  plugin: {identifier: string};
}
