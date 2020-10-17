export class ModalParametersMesseneger {
  private _title: string;
  private _minWidth: number;
  private _minHeight: number;


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get minWidth(): number {
    return this._minWidth;
  }

  set minWidth(value: number) {
    this._minWidth = value;
  }

  get minHeight(): number {
    return this._minHeight;
  }

  set minHeight(value: number) {
    this._minHeight = value;
  }
}
