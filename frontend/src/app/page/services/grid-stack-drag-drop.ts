import {$, GridStackDDJQueryUI} from 'gridstack';

export class GridStackDragDrop extends GridStackDDJQueryUI{
  on(el, name, callback): GridStackDragDrop {
    const $el = $(el);
    $el.on(name, (event, ui) => {
      if (!ui){
        return;
      }
      callback(event, ui.draggable ? ui.draggable[0] : event.target, ui.helper ? ui.helper[0] : null);
    });
    return this;
  }
  off(el, name): GridStackDragDrop {
    const $el = $(el);
    $el.off(name);
    return this;
  }
}
