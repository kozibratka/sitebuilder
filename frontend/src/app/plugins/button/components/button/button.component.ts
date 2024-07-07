import {Component} from '@angular/core';
import {AbstractPlugin} from "../../../shared/abstract-class/abstract-plugin";
import {ButtonConfigInterface} from "../../interfaces/button-config-interface";
import {PageListResolverService} from "../../../../page/services/page-list-resolver.service";
import {LinkDeactivateDirective} from "../../../../core/directives/link-deactivate.directive";

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [
    LinkDeactivateDirective
  ],
  styleUrls: ['./button.component.css']
})
export class ButtonComponent extends AbstractPlugin<ButtonConfigInterface>{
  constructor(
    public pageListResolverService: PageListResolverService,
  ) {
    super();
  }

  refreshView(): void {
  }
}
