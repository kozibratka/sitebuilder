import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SettingAbleInterface} from './interfaces/setting-able-interface';
import {SettingSubjectAbleInterface} from './interfaces/setting-subject-able-interface';
import {MoveAbleSettingsManagerService} from './Services/move-able-settings-manager.service';
import {EventEmitterService} from '../../services/event-emitter-service';
import {Event} from '../../services/api/symfony-api/tools/constants/event';

@Component({
  selector: 'app-moveable-settings',
  standalone: true,
  templateUrl: './move-able-settings.component.html',
  styleUrls: ['./move-able-settings.component.css']
})
export class MoveAbleSettingsComponent implements OnInit, OnDestroy {

  @ViewChild('settingContent', {read: ViewContainerRef, static: true}) settingContent: ViewContainerRef;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.left') left = '0px';
  @HostBinding('style.top') top = '0px';
  items: {label: string, path: string, component: Type<SettingSubjectAbleInterface>}[] = [];
  subjectForSetting: SettingAbleInterface<any> = null;
  private _indexSelected: number;
  private allowHide = true;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private moveAbleSettingsManagerService: MoveAbleSettingsManagerService,
              private eventEmitterService: EventEmitterService<boolean>,
              private elementRef: ElementRef
              ) { }

  @HostListener('click')
  click() {
    this.allowHide = false;
  }

  ngOnInit(): void {
    this.moveAbleSettingsManagerService.registerSettingsComponent(this);
    this.eventEmitterService.registerCallback(Event.ADMINISTRATION_ELSEWHERE_CLICK, (eventName, status) => {
      this.close();
    });
    this.display = 'none';
  }

  close() {
    if (this.allowHide && this.display !== 'none') {
      this.display = 'none';
    }
    this.allowHide = true;
  }

  registerComponent(settingAble: SettingAbleInterface<any>): void {
    // this.items = settingAble.getSettingItems();
    // this.subjectForSetting = settingAble;
    // this.indexSelected = 0;
    // this.allowHide = false;
    // setTimeout(() => {
    //   this.display = 'block';
    //   this.elementRef.nativeElement.style.display = 'block';
    //   const centerPosition = ElementHelper.centerToViewportInDocument(this.elementRef.nativeElement);
    //   this.left = centerPosition.x + 'px';
    //   this.top = centerPosition.y + 'px';
    // }, 0);
  }

  submitAdminSettings(): void {
    return;
  }

  get indexSelected(): number {
    return this._indexSelected;
  }

  set indexSelected(value: number) {
    this._indexSelected = value;
    this.settingContent.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.items[this._indexSelected].component);
    this.settingContent.createComponent<SettingSubjectAbleInterface>(componentFactory).instance.setSubject(this.subjectForSetting);
  }

  ngOnDestroy() {
    this.eventEmitterService.unregisterCallback(Event.ADMINISTRATION_ELSEWHERE_CLICK);
  }
}
