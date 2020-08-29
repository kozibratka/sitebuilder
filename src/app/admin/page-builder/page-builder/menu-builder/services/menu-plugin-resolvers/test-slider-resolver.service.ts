import {AbstractMenuPluginResolver} from './abstract-menu-plugin-resolver';

export class TestSliderResolverService extends AbstractMenuPluginResolver {

  constructor() {
    super();
  }

  getComponent(): new(...args: any[]) => any {
    return undefined;
  }

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=2';
  }
}
