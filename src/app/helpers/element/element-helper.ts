import * as documentOffset from 'document-offset';
import {ElementPositionMessenger} from './messengers/element-position-messenger';


export class ElementHelper {

  public static getPositionToParentElement(childElement: HTMLElement, parentElement: HTMLElement, addToPosition = {
    x: 0,
    y: 0
  }): ElementPositionMessenger {
    const yPosition = documentOffset(childElement).top -
      documentOffset(parentElement).top + addToPosition.y;
    const xPosition = documentOffset(childElement).left -
      documentOffset(parentElement).left + addToPosition.x;

    return new ElementPositionMessenger(xPosition, yPosition);
  }

  public static getPositionToDocument(htmlElement: HTMLElement, addToPosition = {
    x: 0,
    y: 0
  }): ElementPositionMessenger {
    const yPosition = documentOffset(htmlElement).top + addToPosition.y;
    const xPosition = documentOffset(htmlElement).left + addToPosition.x;

    return new ElementPositionMessenger(xPosition, yPosition);
  }
}
