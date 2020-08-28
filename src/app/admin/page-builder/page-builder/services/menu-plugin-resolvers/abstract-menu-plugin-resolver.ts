export abstract class AbstractMenuPluginResolver {
  abstract getMenuImage(): string;
  abstract getComponent(): new(...args: any[]) => any;
}
