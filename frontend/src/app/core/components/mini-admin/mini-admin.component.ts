import {Component, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminAbleInterface} from './tools/interfaces/admin-able-interface';
import {SettingAbleInterface} from './tools/interfaces/setting-able-interface';

@Component({
  selector: 'app-mini-admin',
  templateUrl: './mini-admin.component.html',
  styleUrls: ['./mini-admin.component.css']
})
export class MiniAdminComponent implements OnInit {

  @ViewChild('content1', {read: ViewContainerRef, static: true}) content1: ViewContainerRef;
  adminAble: AdminAbleInterface & SettingAbleInterface;
  selectedComponent: new() => any;
  headerName = '';
  settings: any;
  admin: SettingAbleInterface;
  label = '';
  constructor() { }

  ngOnInit(): void {
  }

  showContent(component: new() => SettingAbleInterface, label: string) {
    this.selectedComponent = component;
    this.content1.clear();
    this.admin = this.content1.createComponent<SettingAbleInterface>(component).instance;
    this.admin.settings = this.settings;
    this.admin.contextObject = this.adminAble.contextObject;
    this.label = label;
  }

  @Input() set configAdmin(value: AdminAbleInterface & SettingAbleInterface) {
    this.adminAble = value;
    this.settings = value.settings;
    this.showContent(value.adminComponentsClass[0].component, value.adminComponentsClass[0].label);
  }
}
