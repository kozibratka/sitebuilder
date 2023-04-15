import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemInterface} from '../../interfaces/item-interface';
import {WebDetailResolverService} from '../../../../../web/services/web-detail-resolver.service';

@Component({
  selector: 'app-menu-item-settings',
  templateUrl: './item-settings.component.html',
  styleUrls: ['./item-settings.component.css']
})
export class ItemSettingsComponent {
  settings: FormGroup;
  pages: {id: number, name: string}[];
  constructor(
    private webDetail: WebDetailResolverService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: ItemInterface,
  ) {
    this.pages = this.webDetail.webDetail.pages;
    this.settings = this.fb.group({
      name: ['', [Validators.required]],
      idPage: [null, [Validators.required]],
    });
    if (data) {
      data.page = null;
      this.settings.patchValue(data);
    }
  }
}
