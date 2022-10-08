import {Injectable, Type} from '@angular/core';
import {MoveableModalComponent} from '../../moveable-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MoveableModalService {

  moveableModalComponent: MoveableModalComponent;

  constructor() {
  }

  registerModal(moveAbleSettingsComponent: MoveableModalComponent): void {
    this.moveableModalComponent = moveAbleSettingsComponent;
  }

  registerComponent(component: Type<any>): void {
    this.moveableModalComponent.registerComponent(component, null);
  }
}
