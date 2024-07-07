import {Component, OnInit} from '@angular/core';
import {SettingAbleInterface} from "../../../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {PageBlockComponent} from "../../page-block/page-block.component";
import {PageBlockInterface} from "../../../../interfaces/page-block-interface";
import {FormService} from "../../../../../core/services/form.service";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-block-dimension',
  standalone: true,
  templateUrl: './block-dimension.component.html',
  imports: [
    ReactiveFormsModule
  ],
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
        paddingBottom: [0],
      },
      this.settings
    );
  }
}
