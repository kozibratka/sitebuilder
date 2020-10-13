import {AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-for-route',
  templateUrl: './modal-for-route.component.html',
  styleUrls: ['./modal-for-route.component.css'],
})
export class ModalForRouteComponent implements OnInit, AfterViewChecked {

  private _schedulerShowModal = false;
  @ViewChild('modalContent') private modalContent: ElementRef<HTMLElement>;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if (!this._schedulerShowModal) {
      return;
    }
    console.log('fffff');
    this._schedulerShowModal = false;
  }

  get schedulerShowModal(): boolean {
    return this._schedulerShowModal;
  }

  set schedulerShowModal(value: boolean) {
    this._schedulerShowModal = value;
  }
}
