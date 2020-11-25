import { Component, OnInit } from '@angular/core';
import {LinkGenerateAble} from '../../core/interfaces/link-generate-able';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test-plugin.component.html',
  styleUrls: ['./test-plugin.component.css']
})
export class TestPluginComponent implements OnInit, LinkGenerateAble {

  constructor() {  }

  ngOnInit(): void {
  }

  getLink(): { commands: any[]; extras?: NavigationExtras } {
    return {commands: ['test-plugin/color-settings']};
  }

}
