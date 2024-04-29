import { Component } from '@angular/core';
import {SettingAbleInterface} from "../../../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {PageBlockInterface} from "../../../../interfaces/page-block-interface";
import {PageBlockComponent} from "../../page-block/page-block.component";

@Component({
  selector: 'block-appearance',
  templateUrl: './block-appearance.component.html',
  styleUrls: ['./block-appearance.component.css']
})
export class BlockAppearanceComponent implements SettingAbleInterface{
  contextObject: PageBlockComponent;
  settings: PageBlockInterface;

  updateColor($event) {
    this.settings.backgroundColor = $event.target.value;
  }

  updateImage(path: string) {
    this.settings.backgroundImage = path;
  }
}
