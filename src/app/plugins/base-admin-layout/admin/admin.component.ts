import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {MenuLabel} from '../menu-labels/interfaces/menu-label';
import {MENU_LABELS} from '../menu-labels/injection-tokens/menu-label';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [

  ]
})
export class AdminComponent implements OnInit, AfterViewChecked {

  private pluginAdminChanged = false;

  constructor(
    @Inject(MENU_LABELS) private menuLabels: MenuLabel[],
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
  }



}
