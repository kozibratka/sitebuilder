import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminAbleInterface} from './tools/interfaces/admin-able-interface';
import {SettingAbleInterface} from './tools/interfaces/setting-able-interface';

@Component({
  selector: 'app-mini-admin',
  templateUrl: './mini-admin.component.html',
  styleUrls: ['./mini-admin.component.css']
})
export class MiniAdminComponent implements OnInit {

  @ViewChild('content1', {read: ViewContainerRef, static: true}) content1: ViewContainerRef;
  adminAble: AdminAbleInterface;
  selectedComponent: new() => any;
  headerName = '';
  settings: any;
  admin: SettingAbleInterface;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
  }

  showContent(component: new() => SettingAbleInterface) {
    this.selectedComponent = component;
    this.content1.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.admin = this.content1.createComponent<SettingAbleInterface>(componentFactory).instance;
    this.admin.settings = this.settings;
  }

  setAdminAble(value: AdminAbleInterface, settings: any) {
    this.settings = settings;
    this.adminAble = value;
    this.showContent(this.adminAble.adminComponentsClass()[0].component);
  }
}
