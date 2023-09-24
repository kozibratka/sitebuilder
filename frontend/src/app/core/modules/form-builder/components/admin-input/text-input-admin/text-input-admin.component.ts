import { Component } from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {TextInput} from '../../../class/text-input';

@Component({
  selector: 'app-text-input-admin',
  templateUrl: './text-input-admin.component.html',
  styleUrls: ['./text-input-admin.component.css']
})
export class TextInputAdminComponent extends BaseAdminComponent<TextInput>{

}
