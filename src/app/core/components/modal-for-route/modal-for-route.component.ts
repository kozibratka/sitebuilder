import {AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {JqueryVersionService} from '../../services/jquery-version.service';

declare const $: any;

@Component({
  selector: 'app-modal-for-route',
  templateUrl: './modal-for-route.component.html',
  styleUrls: ['./modal-for-route.component.css'],
})
export class ModalForRouteComponent implements OnInit, AfterViewChecked {

  private _schedulerShowModal = false;
  @ViewChild('modalContent') private modalContent: ElementRef<HTMLElement>;

  constructor(
     private jqueryVersionService: JqueryVersionService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if (!this._schedulerShowModal) {
      return;
    }
    (this.jqueryVersionService.jqueryFromAssets('.modal') as any).modal('show');
    this._schedulerShowModal = false;
  }

  get schedulerShowModal(): boolean {
    return this._schedulerShowModal;
  }

  set schedulerShowModal(value: boolean) {
    this._schedulerShowModal = value;
  }
}
