import {AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMPONENT_CREATED_NOTIFIER} from './injection-tokens/component-created-notifier';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-modal-for-route',
  templateUrl: './modal-for-route.component.html',
  styleUrls: ['./modal-for-route.component.css'],
  providers: [
    {
      provide: COMPONENT_CREATED_NOTIFIER, useFactory: () => new Subject<boolean>()
    }
  ]
})
export class ModalForRouteComponent implements OnInit, AfterViewChecked {

  private schedulerShowModal = false;
  @ViewChild('modalContent') private modalContent: ElementRef<HTMLElement>;

  constructor(
    @Inject(COMPONENT_CREATED_NOTIFIER) private componentCreatedNotifier: Subject<boolean>
  ) { }

  ngOnInit(): void {
    this.componentCreatedNotifier.subscribe((notified) => {
      this.schedulerShowModal = true;
    });
  }

  ngAfterViewChecked(): void {
    if (!this.schedulerShowModal) {
      return;
    }
    this.schedulerShowModal = false;
  }

}
