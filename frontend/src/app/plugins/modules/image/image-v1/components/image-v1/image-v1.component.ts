import {AfterViewChecked, Component} from '@angular/core';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {ImageV1ConfigInterface} from '../../interfaces/image-v1-config-interface';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';

@Component({
  selector: 'app-image-v1',
  templateUrl: './image-v1.component.html',
  styleUrls: ['./image-v1.component.css']
})
export class ImageV1Component extends AbstractPlugin<ImageV1ConfigInterface> implements AfterViewChecked{
  initEmptySettings(): ImageV1ConfigInterface {
    return {
      identifier: PluginIdentifier.IMAGE_V1,
      imagePath: 'https://picsum.photos/seed/picsum/400/200',
    };
  }

  ngAfterViewChecked(): void {
  }

  refreshView(): void {
    console.log('ffffff');
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
