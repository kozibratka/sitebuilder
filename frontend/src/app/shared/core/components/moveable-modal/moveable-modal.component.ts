import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ElementHelper} from '../../helpers/element-helper';
import {MoveableModalService} from './tools/services/moveable-modal.service';

@Component({
  selector: 'app-moveable-modal',
  templateUrl: './moveable-modal.component.html',
  styleUrls: ['./moveable-modal.component.css']
})
export class MoveableModalComponent implements OnInit {

  @ViewChild('content', {read: ViewContainerRef, static: true}) content: ViewContainerRef;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.left') left = '0px';
  @HostBinding('style.top') top = '0px';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private moveableModalService: MoveableModalService
  ) { }

  ngOnInit(): void {
    this.moveableModalService.registerModal(this);
  }

  @HostListener('click', ['$event'])
  click(event: any) {
    event.stopPropagation(); event.preventDefault();
  }

  registerComponent(component: Type<any>, callback: (instance) => void): void {
    this.content.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const instance = this.content.createComponent(componentFactory).instance;
    callback(instance);
    setTimeout(() => {
      this.display = 'block';
      this.elementRef.nativeElement.style.display = 'block';
      const centerPosition = ElementHelper.centerToViewportInDocument(this.elementRef.nativeElement);
      this.left = centerPosition.x + 'px';
      this.top = centerPosition.y + 'px';
    }, 0);
  }
}
