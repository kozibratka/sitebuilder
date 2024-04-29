import { Component } from '@angular/core';
import {SettingAbleInterface} from "../../../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {PageBlockComponent} from "../../page-block/page-block.component";
import {PageBlockInterface} from "../../../../interfaces/page-block-interface";

@Component({
  selector: 'app-block-dimension',
  templateUrl: './block-dimension.component.html',
  styleUrls: ['./block-dimension.component.css']
})
export class BlockDimensionComponent implements SettingAbleInterface{
  contextObject: PageBlockComponent;
  settings: PageBlockInterface;
}
