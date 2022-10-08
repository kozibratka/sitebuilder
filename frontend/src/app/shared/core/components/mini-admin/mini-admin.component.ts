import {Component, ComponentFactoryResolver, ElementRef, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {SettingAbleInterface} from './tools/interfaces/setting-able-interface';
import {SettingSubjectAbleInterface} from './tools/interfaces/setting-subject-able-interface';

@Component({
  selector: 'app-mini-admin',
  templateUrl: './mini-admin.component.html',
  styleUrls: ['./mini-admin.component.css']
})
export class MiniAdminComponent implements OnInit {

  @ViewChild('content', {read: ViewContainerRef, static: true}) content: ViewContainerRef;
  settings: SettingAbleInterface;
  selectedComponent: Type<SettingSubjectAbleInterface>;
  headerName = '';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
  }

  showContent(component: Type<SettingSubjectAbleInterface>) {
    this.selectedComponent = component;
    this.content.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.content.createComponent(componentFactory);
  }
}
