export interface PaletteGridItemInterface<T> {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  plugin: T;
}