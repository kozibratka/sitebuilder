import {GridItemHTMLElement} from 'gridstack';
import {PaletteItemComponent} from '../../palette-block-component/palette-item-component/palette-item.component';

export interface GridItemHTMLElementItemComponent extends GridItemHTMLElement{
  paletteItemComponent: PaletteItemComponent;
}
