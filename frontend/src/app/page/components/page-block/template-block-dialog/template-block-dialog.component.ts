import {Component, Inject, OnInit} from '@angular/core';
import {SymfonyApiClientService} from "../../../../core/services/api/symfony-api/symfony-api-client.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PageBlockComponent} from "../page-block/page-block.component";

@Component({
  selector: 'app-template-block-dialog',
  templateUrl: './template-block-dialog.component.html',
  styleUrls: ['./template-block-dialog.component.css']
})
export class TemplateBlockDialogComponent implements OnInit{
  category: {name: string, id: number}[] = [];
  selectedCategory = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {block: PageBlockComponent},
    private symfonyApiClientService: SymfonyApiClientService
  ) {

  }
  ngOnInit(): void {
    this.symfonyApiClientService.get<any[]>('page_block_template_category_list').subscribe(value => {
      this.category = value.body;
      this.selectedCategory = this.category[0].id;
    });
  }
}
