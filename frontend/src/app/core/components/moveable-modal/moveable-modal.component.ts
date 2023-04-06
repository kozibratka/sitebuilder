import {
  Component,
  ContentChild,
  Inject,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InitAbleInterface} from './interfaces/init-able-interface';

@Component({
  selector: 'app-moveable-modal',
  templateUrl: './moveable-modal.component.html',
  styleUrls: ['./moveable-modal.component.css']
})
export class MoveableModalComponent {

  @ContentChild('modalContent') content: ViewContainerRef;
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {contentComponent: new() => InitAbleInterface, params: any}
  ) {
    const component = this.content.createComponent<InitAbleInterface>(data.contentComponent).instance;
    component.setInitParams(data.params);
  }
}
