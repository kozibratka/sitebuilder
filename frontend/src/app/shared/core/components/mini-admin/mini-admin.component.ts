import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminAbleInterface} from './tools/interfaces/admin-able-interface';
import {SettingAbleInterface} from './tools/interfaces/setting-able-interface';

@Component({
  selector: 'app-mini-admin',
  templateUrl: './mini-admin.component.html',
  styleUrls: ['./mini-admin.component.css']
})
export class MiniAdminComponent implements OnInit {

  @ViewChild('content', {read: ViewContainerRef, static: true}) content: ViewContainerRef;
  adminAble: AdminAbleInterface;
  selectedComponent: new() => any;
  headerName = '';
  settings: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
  }

  showContent(component: new() => SettingAbleInterface) {
    this.selectedComponent = component;
    this.content.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const admin = this.content.createComponent<SettingAbleInterface>(componentFactory).instance;
    admin.settings = this.settings;
  }

  setAdminAble(value: AdminAbleInterface, settings: any) {
    this.settings = settings;
    this.adminAble = value;
    this.showContent(this.adminAble.adminComponentsClass()[0].component);
  }
}
