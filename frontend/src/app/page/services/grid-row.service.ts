import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridRowService {
  private _addRowHoverIndex: number = null;
  newRowMenuOpened = false;
  constructor() { }


  get addRowHoverIndex(): number {
    return this._addRowHoverIndex;
  }

  set addRowHoverIndex(value: number) {
    if (this.newRowMenuOpened) {
      return;
    }
    this._addRowHoverIndex = value;
  }
}
