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

@Injectable({
  providedIn: 'root'
})
export class PageBlockTemplateService {
  pageBlock: PageBlockInterface;
  templateBlocksPerCategory = new Map<string, PageBlockInterface[]>();
  templateBlockCategory:string[] = [];
  selectedTemplateBlockCategory = '';
  selectedBlockTemplates: PageBlockInterface[] = [];
  private webBlocks: PageBlockInterface[];

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService,
    private dialog: MatDialog,
  ) { }

  saveAsTemplateDialog(blockComponent: PageBlockComponent) {
    this.dialog.open(TemplateBlockDialogComponent).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      let block = {...this.pageBlock, category: value.selectedCategory, web: this.webDetailResolverService.webDetail.id};
      if (value.image) {
        this.uploadBlockTemplate(value.image, block);
      } else {
        ImageService.screenshot(blockComponent.elementRef).subscribe(image => {
          this.uploadBlockTemplate(image, block, true);
        });
      }
    })
  }

  uploadBlockTemplate(image: string | File, block, isBase64 = false) {
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
    this.symfonyApiClientService.post('page_block_template_create', formData).subscribe({
      next: (value) => {
        ArrayHelper.reinitArray(this.webBlocks, value.body);
        this.refreshMenu(value.body);
        this.notifierService.notify('Blok byl úspěšně přidán do šablon');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

  deleteTemplateBlock(block:  PageBlockInterface) {
    this.dialog.open(RemoveItemComponent, {data: { name: 'šablona bloku' }}).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      this.symfonyApiClientService.post('page_block_template_delete', {}, {id: block.id}).subscribe({
        next: (resp) => {
          ArrayHelper.reinitArray(this.webBlocks, value.body);
          this.refreshMenu(resp.body);
          this.notifierService.notify('Šablona Bloku byla úspěšně smazána');
        },
        error: err => this.httpResponseToasterService.showError(err)
      });
    })
  }

  refreshMenu(webBlocks: PageBlockInterface[]) {
    this.webBlocks = webBlocks;
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
    this.changeSelectedTemplateBlocks(this.selectedTemplateBlockCategory);
  }

  changeSelectedTemplateBlocks(name) {
    this.selectedTemplateBlockCategory = name;
    if (!this.selectedTemplateBlockCategory.length) {
      this.selectedBlockTemplates = _.flatten([...this.templateBlocksPerCategory.values()]);
      this.selectedBlockTemplates.sort((a, b) => {
        return a.category.name.localeCompare(b.category.name);
      });
    } else {
      this.selectedBlockTemplates = this.templateBlocksPerCategory.get(this.selectedTemplateBlockCategory);
    }
  }
}