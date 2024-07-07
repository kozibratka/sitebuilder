import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {ButtonConfigInterface} from "../../interfaces/button-config-interface";
import {FormService} from "../../../../core/services/form.service";
import {PageListResolverService} from "../../../../page/services/page-list-resolver.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgSwitch} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FileManagerModalService} from "../../../../core/modules/file-manager/services/file-manager-modal.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-button-link-admin',
  standalone: true,
  templateUrl: './button-link-admin.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSwitch,
    MatButton,
    MatIconModule
  ],
  styleUrls: ['./button-link-admin.component.css']
})
export class ButtonLinkAdminComponent extends AbstractAdminSetting<ButtonConfigInterface> {
  linkType = [{id: 1, name: 'Stránka'}, {id: 2, name: 'Url'}, {id: 3, name: 'Soubor'}];
  public pageList$ = null;

  constructor(
    protected adminFormService: FormService,
    public pageListResolverService: PageListResolverService,
    private fileManagerModalService: FileManagerModalService,
  ) {
    super();
  }
  createAdminForm(settings: ButtonConfigInterface): void {
    this.pageList$ = this.pageListResolverService.getPageList();

    this.adminForm = this.adminFormService.createForm(
      {
        linkType: [null],
        pageId: [null],
        externalUrl: [null],
        fileUrl: [null],
        targetBlank: [false],
      },
      settings
    );
    this.adminForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        const value = this.adminForm.value as any;
        if (value.linkType === 1) {
          settings.externalUrl = null;
          settings.fileUrl = null;
          settings.pageUrl = this.pageListResolverService.getPageDetail(settings.pageId).url;
        } else if (value.linkType === 2) {
          settings.pageId = null;
          settings.fileUrl = null;
        } else if (value.linkType === 3) {
          settings.externalUrl = null;
          settings.pageId = null;
        }
      }
    });
  }

  openFileManager() {
    this.fileManagerModalService.open().subscribe(value => {
      if (value.eventName === 'selected') {
        this.settings.fileUrl = value.files[0]?.publicPath;
      }
    });
  }
}
