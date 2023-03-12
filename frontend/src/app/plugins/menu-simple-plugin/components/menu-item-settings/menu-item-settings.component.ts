import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';
import {WebDetailResolverService} from '../../../../web/services/web-detail-resolver.service';

@Component({
  selector: 'app-menu-item-settings',
  templateUrl: './menu-item-settings.component.html',
  styleUrls: ['./menu-item-settings.component.css']
})
export class MenuItemSettingsComponent {
  settings: FormGroup;
  pages: {id: number, name: string}[];
  constructor(
    private webDetail: WebDetailResolverService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: MenuItemInterface,
  ) {
    this.pages = this.webDetail.webDetail.pages;
    this.settings = this.fb.group({
      name: ['', [Validators.required]],
      idPage: ['', [Validators.required]],
    });
    if (data) {
      this.settings.patchValue(data);
    }
  }
}
