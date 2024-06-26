import {
  Component,
  Inject, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InitAbleInterface} from './interfaces/init-able-interface';
import {Subject} from "rxjs";

@Component({
  selector: 'app-moveable-modal',
  templateUrl: './moveable-modal.component.html',
  styleUrls: ['./moveable-modal.component.css']
})
export class MoveableModalComponent<T> implements OnInit {

  @ViewChild('modalContent', {read: ViewContainerRef, static: true}) content: ViewContainerRef;
  title = '';
  instanceReady$ = new Subject<InitAbleInterface<T>>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {contentComponent: new() => InitAbleInterface<T>, params: T, title: string}
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {
    let instance = this.content.createComponent<InitAbleInterface<T>>(this.data.contentComponent).instance;
    if (this.data.params) {
      instance.setInitParams = this.data.params;
    }
    this.instanceReady$.next(instance);
  }
}
