import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {JqueryVersionService} from '../../services/jquery-version.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalParametersMesseneger} from './tools/messengers/modal-for-route/modal-parameters-messeneger';

declare const $: any;

@Component({
  selector: 'app-modal-for-route',
  templateUrl: './modal-for-route.component.html',
  styleUrls: ['./modal-for-route.component.css'],
})
export class ModalForRouteComponent implements OnInit, AfterViewChecked {

  private _schedulerShowModal: ModalParametersMesseneger;
  @ViewChild('modalContent') private modalContent: ElementRef<HTMLElement>;
  title = '';

  constructor(
    private jqueryVersionService: JqueryVersionService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.title = 'sdgsdhsdh';
  }

  ngAfterViewChecked(): void {
    this.showModal();
  }

  showModal(): void {
    if (!this._schedulerShowModal) {
      return;
    }
    this.title = this.schedulerShowModal.title;
    (this.jqueryVersionService.jqueryFromAssets(this.modalContent.nativeElement) as any).modal('show');
    this.jqueryVersionService.jqueryFromAssets(this.modalContent.nativeElement).on('hidden.bs.modal', (e) => {
      this.router.navigate(['./'], {relativeTo: this.route});
    });
    this._schedulerShowModal = null;
    this.cd.detectChanges();
  }

  get schedulerShowModal(): ModalParametersMesseneger {
    return this._schedulerShowModal;
  }

  set schedulerShowModal(value: ModalParametersMesseneger) {

    this._schedulerShowModal = value;
  }
}
