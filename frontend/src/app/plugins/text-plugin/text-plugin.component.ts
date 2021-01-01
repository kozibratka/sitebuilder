import { Component, OnInit } from '@angular/core';
import {LinkGenerateAble} from '../../core/interfaces/link-generate-able';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-text-plugin',
  templateUrl: './text-plugin.component.html',
  styleUrls: ['./text-plugin.component.css']
})
export class TextPluginComponent implements OnInit, LinkGenerateAble {

  constructor() {  }

  ngOnInit(): void {
  }

  getLink(): { commands: any[]; extras?: NavigationExtras } {
    return {commands: ['test-plugin/color-settings']};
  }

}
