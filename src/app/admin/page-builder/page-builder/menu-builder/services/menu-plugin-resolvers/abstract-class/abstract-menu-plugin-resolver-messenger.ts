export abstract class AbstractMenuPluginResolverMessenger {
  abstract getMenuImage(): string;

  abstract get menuImageSize(): { x: number, y: number };

  abstract get componentClass(): new(...args: any[]) => {};

  abstract get menuImageGridSize(): number;
}