import * as documentOffset from 'document-offset';
import {ElementPositionMessenger} from '../messengers/element-position/element-position-messenger';


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

  public static centerToViewportInDocument(htmlElement: HTMLElement) {
    const documentViewportTop = document.body.scrollTop;
    const documentViewportLeft = document.body.scrollLeft;
    const elementWidth = htmlElement.offsetWidth;
    const elementHeight = htmlElement.offsetHeight;
    const destinationXInDocument = (window.innerWidth / 2) - (elementWidth / 2);
    const destinationYInDocument = ((window.innerHeight) / 2) - (elementHeight / 2);
    const rect = htmlElement.getBoundingClientRect();
    const top = rect.top + document.body.scrollTop;
    const left = rect.left + document.body.scrollLeft;
    let differenceY = destinationYInDocument - top + documentViewportTop;
    let differenceX = destinationXInDocument - left + documentViewportLeft;
    if (differenceY && htmlElement.style.top) {
      differenceY = parseInt(htmlElement.style.top, 10) + differenceY;
    } else if (htmlElement.style.top) {
      differenceY = parseInt(htmlElement.style.top, 10);
    }
    if (differenceX && htmlElement.style.left) {
      differenceX = parseInt(htmlElement.style.left, 10) + differenceX;
    } else if (htmlElement.style.left) {
      differenceX = parseInt(htmlElement.style.left, 10);
    }

    return new ElementPositionMessenger(differenceX, differenceY);
  }

  public static getCursorPosition(): number | null {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
       // Cursor position
      return range.startOffset;
    } else {
      return null;
    }
  }

  static getInnerNodeFromClickPosition(event: MouseEvent): Node | null {
    let range;
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(event.clientX, event.clientY);
    }
    else if ((document as any).caretPositionFromPoint) {
      const pos = (document as any).caretPositionFromPoint(event.clientX, event.clientY);
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.setEnd(pos.offsetNode, pos.offset);
    }
    if (range) {
      return range.startContainer;
    }

    return null;
  }
}
