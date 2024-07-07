import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';
import {WebDetailResolverService} from '../../../../web/services/web-detail-resolver.service';
import {PageListResolverService} from "../../../../page/services/page-list-resolver.service";
import {PageInterface} from "../../../../page/interfaces/page-interface";
import {DialogComponent} from "../../../../core/components/dialog/dialog.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu-item-settings',
  standalone: true,
  templateUrl: 'menu-item-settings.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogComponent
  ],
  styleUrls: ['menu-item-settings.component.css']
})
export class MenuItemSettingsComponent {
  settings: FormGroup;
  pages: PageInterface[];
  formData: MenuItemInterface;
  constructor(
    private webDetail: WebDetailResolverService,
    private fb: FormBuilder,
    pageListResolverService: PageListResolverService,
    @Inject(MAT_DIALOG_DATA) private data: MenuItemInterface,
  ) {
    pageListResolverService.getPageList().subscribe(value => {
      this.pages = value;
    });
    this.settings = this.fb.group({
      name: ['', [Validators.required]],
      pageId: [null, [Validators.required]],
    });
    if (data) {
      this.settings.patchValue(data);
    }

    this.settings.statusChanges.subscribe(status => {
      if (status == 'VALID') {
        this.formData = this.settings.value;
        const page = this.pages.find(page => page.id == this.formData.pageId);
        this.formData.pageDetail = {pageUrl: page.url, isHomepage: page.homePage};
      }
    });
  }
}
