import { Component } from '@angular/core';
import {SettingAbleInterface} from "../../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {PageBlockInterface} from "../../../interfaces/page-block-interface";
import {PageBlockComponent} from "../page-block/page-block.component";

@Component({
  selector: 'app-block-admin',
  templateUrl: './block-admin.component.html',
  styleUrls: ['./block-admin.component.css']
})
export class BlockAdminComponent implements SettingAbleInterface{
  contextObject: PageBlockComponent;
  settings: PageBlockInterface;

  updateColor($event) {
    this.settings.backgroundColor = $event.target.value;
  }
}
