import {Component, Injector, OnInit} from '@angular/core';
import {BaseAdminComponent} from '../../../base-admin/base-admin.component';

@Component({
  selector: 'app-color-settings',
  templateUrl: './color-settings.component.html',
  styleUrls: ['./color-settings.component.css']
})
export class ColorSettingsComponent extends BaseAdminComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
