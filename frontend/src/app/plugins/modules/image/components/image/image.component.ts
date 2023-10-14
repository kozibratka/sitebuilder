import {AfterViewChecked, Component} from '@angular/core';
import {ImageConfigInterface} from '../../interfaces/image-config-interface';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';

@Component({
  selector: 'app-image-v1',
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.css']
})
export class ImageComponent extends AbstractPlugin<ImageConfigInterface> implements AfterViewChecked{
  initEmptySettings(): ImageConfigInterface {
    return {
      identifier: PluginIdentifier.IMAGE_V1,
      imagePath: 'https://picsum.photos/seed/picsum/400/200',
    };
  }

  ngAfterViewChecked(): void {
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
