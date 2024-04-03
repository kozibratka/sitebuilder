import { Injectable } from '@angular/core';
import {
  TemplateBlockDialogComponent
} from "../components/page-block/template-block-dialog/template-block-dialog.component";
import {ImageService} from "../../core/services/image.service";
import {ArrayHelper} from "../../core/helpers/array-helper";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";
import {NotifierService} from "../../core/services/notifier.service";
import {HttpResponseToasterService} from "../../core/services/http-response-toaster.service";
import {WebDetailResolverService} from "../../web/services/web-detail-resolver.service";
import {MatDialog} from "@angular/material/dialog";
import {PageBlockInterface} from "../interfaces/page-block-interface";
import {PageBlockComponent} from "../components/page-block/page-block/page-block.component";
import {RemoveItemComponent} from "../../core/components/remove-item/remove-item.component";
import * as _ from 'lodash';
import {StringService} from "../../core/services/string.service";

@Injectable({
  providedIn: 'root'
})
export class PageBlockTemplateService {
  pageBlock: PageBlockInterface;
  templateBlocksPerCategory = new Map<string, PageBlockInterface[]>();
  templateBlockCategory:string[] = [];
  private _selectedCategory = '';
  blockTemplates: PageBlockInterface[] = [];
  private webBlocks: PageBlockInterface[];

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService,
    private dialog: MatDialog,
  ) { }

  initMenu(webBlocks: PageBlockInterface[]) {
    this.webBlocks = webBlocks;
    this.refreshMenu();
  }
  get selectedCategory(): string {
    return this._selectedCategory;
  }

  set selectedCategory(value: string) {
    this._selectedCategory = value;
    this.changeSelectedTemplateBlocks(value);
  }

  saveAsTemplateDialog(blockComponent: PageBlockComponent) {
    this.dialog.open(TemplateBlockDialogComponent).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      let block = {...blockComponent.pageBlock, category: value.selectedCategory, web: this.webDetailResolverService.webDetail.id};
      let formData = null;
      let sendFnc = () => {
        this.symfonyApiClientService.post('page_block_template_create', formData).subscribe({
          next: (value) => {
            ArrayHelper.reinitArray(this.webBlocks, value.body);
            this.refreshMenu();
            this.notifierService.notify('Blok byl úspěšně přidán do šablon');
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      };
      if (value.image) {
        formData = this.prepareFormData(value.image, block);
        sendFnc();
      } else {
        ImageService.screenshot(blockComponent.elementRef).subscribe(image => {
          formData = this.prepareFormData(image, block, true);
          sendFnc();
        });
      }
    })
  }

  update(blockComponent: PageBlockComponent) {
    let dialog = this.dialog.open(TemplateBlockDialogComponent);
    dialog.componentInstance.sendData.selectedCategory = blockComponent.pageBlock.category.id;
    dialog.afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      let block = {...blockComponent.pageBlock, category: value.selectedCategory, web: this.webDetailResolverService.webDetail.id};
      let formData = null;
      let sendFnc = () => {
        this.symfonyApiClientService.post('page_block_template_update', formData, {id: block.id}).subscribe({
          next: (value) => {
            this.refreshMenu(value.body);
            this.notifierService.notify('Blok byl úspěšně přidán do šablon');
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      };
      if (value.image) {
        formData = this.prepareFormData(value.image, block);
        sendFnc();
      } else {
        ImageService.screenshot(blockComponent.elementRef).subscribe(image => {
          formData = this.prepareFormData(image, block, true);
          sendFnc();
        });
      }
    })
  }

  prepareFormData(image: string | File, block, isBase64 = false) {
    const formData = new FormData();
    var blob = new Blob([image], {
      type: "image/png",
    });
    if (isBase64) {
      formData.append("imageBase64", blob);
    } else {
      formData.append("image", blob);
    }
    formData.append("block", JSON.stringify(block));
    return formData;
  }

  deleteTemplateBlock(block:  PageBlockInterface) {
    this.dialog.open(RemoveItemComponent, {data: { name: 'šablona bloku' }}).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      this.symfonyApiClientService.get<any>('page_block_template_delete', {id: block.id}).subscribe({
        next: (resp) => {
          this.refreshMenu(resp.body);
          this.notifierService.notify('Šablona Bloku byla úspěšně smazána');
        },
        error: err => this.httpResponseToasterService.showError(err)
      });
    })
  }

  refreshMenu(data?: PageBlockInterface[]) {
    if (data) {
      ArrayHelper.reinitArray(this.webBlocks, data);
    }
    this.templateBlocksPerCategory.clear();
    let categorySet = new Set<string>();
    this.webBlocks.forEach(value => {
      let category = value.category;
      if (!this.templateBlocksPerCategory.has(category.name)) {
        this.templateBlocksPerCategory.set(category.name, []);
      }
      this.templateBlocksPerCategory.get(category.name).push(value);
      categorySet.add(category.name);
    });
    this.templateBlockCategory = Array.from(categorySet).sort();
    this.changeSelectedTemplateBlocks(this._selectedCategory);
  }

  changeSelectedTemplateBlocks(name) {
    this._selectedCategory = name;
    if (!this._selectedCategory.length) {
      this.blockTemplates = _.flatten([...this.templateBlocksPerCategory.values()]);
      this.blockTemplates.sort((a, b) => {
        return a.category.name.localeCompare(b.category.name);
      });
      let emptyBlock: PageBlockInterface = {rows: [], uniqueId: StringService.randomString()};
      this.blockTemplates.push(emptyBlock);
    } else {
      this.blockTemplates = this.templateBlocksPerCategory.get(this._selectedCategory);
    }
  }
}
