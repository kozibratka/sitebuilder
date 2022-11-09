import {GridItemHTMLElement} from 'gridstack';
import {PaletteItemComponent} from '../components/palette-builder/page-block/palette-item-component/palette-item.component';

export interface GridItemHTMLElementItemComponent extends GridItemHTMLElement{
  paletteItemComponent: PaletteItemComponent;
}
