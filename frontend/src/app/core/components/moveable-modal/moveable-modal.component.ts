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

  @ContentChild('modalContent') content: any;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.left') left = '0px';
  @HostBinding('style.top') top = '0px';
  title = '';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private moveableModalService: MoveableModalService,
  ) { }

  ngOnInit(): void {
    this.moveableModalService.registerModal(this);
    this.display = 'none';
  }

  ngOnDestroy() {
  }

  // pokud aktivní, nefunguje checkobxy v tomto modalu
  // @HostListener('click', ['$event'])
  // click(event: any) {
  //   event.stopPropagation(); event.preventDefault();
  // }

  close() {
    this.display = 'none';
  }

  show(): void {
    setTimeout(() => {
      this.display = 'block';
      this.elementRef.nativeElement.style.display = 'block';
      const centerPosition = ElementHelper.centerToViewportInDocument(this.elementRef.nativeElement);
      this.left = centerPosition.x + 'px';
      this.top = centerPosition.y - (centerPosition.y / 100 * 40) + 'px';
    }, 0);
  }
}
