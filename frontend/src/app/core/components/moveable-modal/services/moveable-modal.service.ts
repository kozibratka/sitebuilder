import {Injectable} from '@angular/core';
import {MoveableModalComponent} from '../moveable-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {InitAbleInterface} from "../interfaces/init-able-interface";

@Injectable({
  providedIn: 'root'
})
export class MoveableModalService {
  constructor(
    public dialog: MatDialog
  ) {
  }

  show<T>(contentComponent: new() => InitAbleInterface, params: T, title: string = '') {
    return this.dialog.open(MoveableModalComponent, {
      data: {
        contentComponent,
        params,
        title: title,
      },
      width: '50%',
      position: {top: '110px'}
    });
  }
}
