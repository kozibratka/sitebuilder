import {Directive, HostListener} from '@angular/core';
import {LinkDeactivateService} from "../services/link-deactivate.service";

@Directive({
  standalone: true,
  selector: '[appLinkDeactivate]'
})
export class LinkDeactivateDirective {

  constructor(
    private linkDeactivateService: LinkDeactivateService
  ) { }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    if (this.linkDeactivateService.deactivate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

}
