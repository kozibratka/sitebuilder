import {Component, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminAbleInterface} from './tools/interfaces/admin-able-interface';
import {SettingAbleInterface} from './tools/interfaces/setting-able-interface';
import {InitAbleInterface} from "../moveable-modal/interfaces/init-able-interface";
import {AdminSettingAbleInterface} from "./tools/interfaces/admin-setting-able-interface";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-mini-admin',
  standalone: true,
  templateUrl: './mini-admin.component.html',
  imports: [
    CommonModule,
    MatIcon
  ],
  styleUrls: ['./mini-admin.component.css']
})
export class MiniAdminComponent implements OnInit, InitAbleInterface<AdminSettingAbleInterface> {

  @ViewChild('content1', {read: ViewContainerRef, static: true}) content1: ViewContainerRef;
  adminAble: AdminAbleInterface & SettingAbleInterface;
  selectedComponent: new() => any;
  headerName = '';
  settings: any;
  admin: SettingAbleInterface;
  label = '';
  allowedAdminComponent = null;
  constructor() { }

  ngOnInit(): void {
  }

  showContent(component: new() => SettingAbleInterface, label: string) {
    if (this.allowedAdminComponent && this.allowedAdminComponent != component) {
      return;
    }
    this.selectedComponent = component;
    this.content1.clear();
    this.admin = this.content1.createComponent<SettingAbleInterface>(component).instance;
    this.admin.contextObject = this.adminAble.contextObject;
    this.admin.settings = this.settings;
    this.label = label;
  }

  @Input() set setInitParams(value: AdminSettingAbleInterface) {
    this.adminAble = value;
    this.settings = value.settings;
    this.showContent(value.adminComponentsClass[0].component, value.adminComponentsClass[0].label);
  }
}
