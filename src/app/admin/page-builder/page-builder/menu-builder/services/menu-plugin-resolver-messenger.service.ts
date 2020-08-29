import {Injectable, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuPluginResolverMessengerService {

  private componentToCreateOnPalette: new(...args: any[]) => any;

  constructor() {
  }

  public setComponentToCreate(componentType: new(...args: any[]) => any): void {
    this.componentToCreateOnPalette = componentType;
  }

  getComponentToCreate(): new(...args: any[]) => any {
    return this.componentToCreateOnPalette;
  }
}
