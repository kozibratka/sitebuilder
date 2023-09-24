import { Component } from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {Selectbox} from '../../../class/selectbox';

@Component({
  selector: 'app-selectbox-admin',
  templateUrl: './selectbox-admin.component.html',
  styleUrls: ['./selectbox-admin.component.css']
})
export class SelectboxAdminComponent extends BaseAdminComponent<Selectbox>{

}
