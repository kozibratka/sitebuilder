import { Injectable } from '@angular/core';
import {MoveableModalComponent} from '../../moveable-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MoveableModalService {

  moveableModalComponent: MoveableModalComponent;

  constructor() {
  }

  registerModal(moveableModalComponent: MoveableModalComponent): void {
    this.moveableModalComponent = moveableModalComponent;
  }

  show(): void {
    this.moveableModalComponent.show();
  }
}
