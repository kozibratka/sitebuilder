import { Component } from '@angular/core';
import {BaseAdminComponent} from '../base-admin/base-admin.component';
import {Textarea} from '../../../../class/textarea';

@Component({
  selector: 'app-textarea-admin',
  templateUrl: './textarea-admin.component.html',
  styleUrls: ['./textarea-admin.component.css']
})
export class TextareaAdminComponent extends BaseAdminComponent<Textarea>{

}
