import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MenuLabel} from '../menu-labels/interfaces/menu-label';
import {MENU_LABELS} from '../menu-labels/injection-tokens/menu-label';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(MENU_LABELS) private menuLabels: MenuLabel[]
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
