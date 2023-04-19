import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MenuV1ItemInterface} from '../../interfaces/menu-v1-item-interface';
import {WebDetailResolverService} from '../../../../../../web/services/web-detail-resolver.service';

@Component({
  selector: 'app-menu-item-settings',
  templateUrl: './menu-v1-item-settings.component.html',
  styleUrls: ['./menu-v1-item-settings.component.css']
})
export class MenuV1ItemSettingsComponent {
  settings: FormGroup;
  pages: {id: number, name: string}[];
  constructor(
    private webDetail: WebDetailResolverService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: MenuV1ItemInterface,
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
