import {AfterViewChecked, Component} from '@angular/core';
import {ImageConfigInterface} from '../../interfaces/image-config-interface';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../shared/constants/plugin-identifier';

@Component({
  selector: 'app-image-v1',
  standalone: true,
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.css']
})
export class ImageComponent extends AbstractPlugin<ImageConfigInterface> implements AfterViewChecked{

  ngAfterViewChecked(): void {
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
