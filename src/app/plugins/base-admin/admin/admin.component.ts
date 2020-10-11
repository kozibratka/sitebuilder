import {Component, Inject, OnInit} from '@angular/core';
import {MENU_LABELS} from '../base-admin.module';
import {MenuLabel} from '../interfaces/menu-label';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    @Inject(MENU_LABELS) private menuLabels: MenuLabel[]
  ) { }

  ngOnInit(): void {
    console.log(this.menuLabels);
  }

}
