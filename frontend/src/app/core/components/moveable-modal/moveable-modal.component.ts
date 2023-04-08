import {
  Component,
  Inject, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InitAbleInterface} from './interfaces/init-able-interface';

@Component({
  selector: 'app-moveable-modal',
  templateUrl: './moveable-modal.component.html',
  styleUrls: ['./moveable-modal.component.css']
})
export class MoveableModalComponent implements OnInit {

  @ViewChild('modalContent', {read: ViewContainerRef, static: true}) content: ViewContainerRef;
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {contentComponent: new() => InitAbleInterface, params: any}
  ) {

  }

  ngOnInit(): void {
    const component = this.content.createComponent<InitAbleInterface>(this.data.contentComponent).instance;
    component.setInitParams(this.data.params);
  }
}
