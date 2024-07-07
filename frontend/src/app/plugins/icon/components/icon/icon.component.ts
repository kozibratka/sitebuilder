import {Component, OnInit} from '@angular/core';
import {AbstractPlugin} from "../../../shared/abstract-class/abstract-plugin";
import {IconConfigInterface} from "../../interfaces/icon-config-interface";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {LinkDeactivateDirective} from "../../../../core/directives/link-deactivate.directive";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    FaIconComponent,
    LinkDeactivateDirective,
    NgIf
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent extends AbstractPlugin<IconConfigInterface> implements OnInit{
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {

  }
  refreshView(): void {
  }
}
