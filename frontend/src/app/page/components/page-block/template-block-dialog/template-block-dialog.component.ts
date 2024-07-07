import {Component, Inject, OnInit} from '@angular/core';
import {SymfonyApiClientService} from "../../../../core/services/api/symfony-api/symfony-api-client.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PageBlockComponent} from "../page-block/page-block.component";
import {DialogComponent} from "../../../../core/components/dialog/dialog.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-template-block-dialog',
  standalone: true,
  templateUrl: './template-block-dialog.component.html',
  imports: [
    DialogComponent,
    FormsModule
  ],
  styleUrls: ['./template-block-dialog.component.css']
})
export class TemplateBlockDialogComponent implements OnInit{
  category: {name: string, id: number}[] = [];
  sendData = {selectedCategory: null, image: null};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {block: PageBlockComponent},
    private symfonyApiClientService: SymfonyApiClientService
  ) {

  }
  ngOnInit(): void {
    this.symfonyApiClientService.get<any[]>('page_block_template_category_list').subscribe(value => {
      this.category = value.body;
      this.sendData.selectedCategory = this.sendData.selectedCategory ?? this.category[0].id;
    });
  }

  onImageChange(event: any) {
    this.sendData.image = event.target.files[0];
  }
}
