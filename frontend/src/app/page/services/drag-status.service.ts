import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragStatusService {
  isCellResized = false;
  isDragMenuPlugin = false;
  isDragPlugin = false;
  isDragRow = false;
  isDragBlock = false;

  constructor() { }

  isDraggedResizedPlugin() {
    return this.isCellResized || this.isDragMenuPlugin || this.isDragPlugin;
  }


}
