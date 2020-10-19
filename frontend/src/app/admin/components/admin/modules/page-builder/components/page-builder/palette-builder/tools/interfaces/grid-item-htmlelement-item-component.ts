import {GridItemHTMLElement} from 'gridstack';
import {PaletteItemComponent} from '../../components/palette-block/components/palette-item/palette-item.component';

export interface GridItemHTMLElementItemComponent extends GridItemHTMLElement{
  paletteItemComponent: PaletteItemComponent;
}
