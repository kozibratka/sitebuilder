import {Injectable} from '@angular/core';
import {MoveableModalComponent} from '../moveable-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MoveableModalService {
  constructor(
    public dialog: MatDialog
  ) {
  }

  show(contentComponent: new() => any, params: any) {
    return this.dialog.open(MoveableModalComponent, {
      data: {
        contentComponent,
        params
      },
      width: '50%',
      position: {top: '110px'}
    });
  }
}
