import {
  Component,
  ComponentFactoryResolver, ContentChild,
  ElementRef,
  HostBinding,
  HostListener, OnDestroy,
  OnInit, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ElementHelper} from '../../helpers/element-helper';
import {MoveableModalService} from './tools/services/moveable-modal.service';
import {Event} from '../../services/api/symfony-api/tools/constants/event';
import {EventEmitterService} from '../../services/event-emitter-service';

@Component({
  selector: 'app-moveable-modal',
  templateUrl: './moveable-modal.component.html',
  styleUrls: ['./moveable-modal.component.css']
})
export class MoveableModalComponent implements OnInit, OnDestroy {

  @ContentChild('content') content: any;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.left') left = '0px';
  @HostBinding('style.top') top = '0px';
  private allowHide = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private moveableModalService: MoveableModalService,
    private eventEmitterService: EventEmitterService<boolean>,
  ) { }

  ngOnInit(): void {
    this.moveableModalService.registerModal(this);
    this.eventEmitterService.registerCallback(Event.ADMINISTRATION_ELSEWHERE_CLICK, (eventName, status) => {
      this.close();
    });
    this.display = 'none';
  }

  ngOnDestroy() {
    this.eventEmitterService.unregisterCallback(Event.ADMINISTRATION_ELSEWHERE_CLICK);
  }

  @HostListener('click', ['$event'])
  click(event: any) {
    event.stopPropagation(); event.preventDefault();
    this.allowHide = false;
  }

  close() {
    if (this.allowHide && this.display !== 'none') {
      this.display = 'none';
    }
    this.allowHide = true;
  }

  show(): void {
    setTimeout(() => {
      this.display = 'block';
      this.elementRef.nativeElement.style.display = 'block';
      const centerPosition = ElementHelper.centerToViewportInDocument(this.elementRef.nativeElement);
      this.left = centerPosition.x + 'px';
      this.top = centerPosition.y + 'px';
    }, 0);
  }
}
