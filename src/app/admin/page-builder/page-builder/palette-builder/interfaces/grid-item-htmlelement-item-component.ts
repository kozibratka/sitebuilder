import {GridItemHTMLElement} from 'gridstack';
import {PaletteItemComponent} from '../palette-block/palette-item/palette-item.component';

export interface GridItemHTMLElementItemComponent extends GridItemHTMLElement{
  paletteItemComponent: PaletteItemComponent;
}