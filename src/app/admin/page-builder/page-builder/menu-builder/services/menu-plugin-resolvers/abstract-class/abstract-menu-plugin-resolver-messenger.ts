export abstract class AbstractMenuPluginResolverMessenger {
  abstract getMenuImage(): string;

  abstract getMenuImageSize(): { x: number, y: number };

  abstract getComponentClass(): new(...args: any[]) => {};

  abstract getMenuImageGridSize(): number;
}
