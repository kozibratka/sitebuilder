import {Component, OnInit} from '@angular/core';
import {SettingAbleInterface} from "../../../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {PageBlockComponent} from "../../page-block/page-block.component";
import {PageBlockInterface} from "../../../../interfaces/page-block-interface";
import {FormService} from "../../../../../core/services/form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-block-dimension',
  templateUrl: './block-dimension.component.html',
  styleUrls: ['./block-dimension.component.css']
})
export class BlockDimensionComponent implements SettingAbleInterface, OnInit{
  contextObject: PageBlockComponent;
  settings: PageBlockInterface;
  adminForm: FormGroup;

  constructor(
    protected adminFormService: FormService,
  ) {
  }

  ngOnInit(): void {
    this.adminForm = this.adminFormService.createForm(
      {
        height: [''],
        paddingTop: [0],
      },
      this.settings
    );
  }
}
