import {PaletteBlockSettingsInterface} from '../../palette-builder-component/palette-block-component/tools/interfaces/palette-block-settings-interface';

export interface PageSettingsInterface {
  id: number;
  name: string;
  pageBlocks: PaletteBlockSettingsInterface[];
}
