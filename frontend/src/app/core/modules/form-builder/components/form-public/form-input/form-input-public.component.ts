import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StringService} from '../../../../../services/string.service';

@Component({
  selector: 'app-form-input-public',
  templateUrl: './form-input-public.component.html',
  styleUrls: ['./form-input-public.component.css']
})
export class FormInputPublicComponent {
  @Input() formData: any;
  uniqueId = StringService.randomString();


  constructor(
    public dialog: MatDialog
  ) {
  }
}
