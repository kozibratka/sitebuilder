import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {JqueryVersionService} from '../../services/jquery-version.service';
import {ActivatedRoute, Router} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-modal-for-route',
  standalone: true,
  templateUrl: './modal-for-route.component.html',
  styleUrls: ['./modal-for-route.component.css'],
})
export class ModalForRouteComponent implements OnInit, AfterViewChecked {

  private _schedulerShowModal: boolean;
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
    (this.jqueryVersionService.jqueryFromAssets(this.modalContent.nativeElement) as any).modal('show');
    this.jqueryVersionService.jqueryFromAssets(this.modalContent.nativeElement).on('hidden.bs.modal', (e) => {
      this.router.navigate(['./'], {relativeTo: this.route});
    });
    this._schedulerShowModal = false;
    this.cd.detectChanges();
  }

  get schedulerShowModal() {
    return this._schedulerShowModal;
  }

  set schedulerShowModal(value: boolean) {

    this._schedulerShowModal = value;
  }
}
