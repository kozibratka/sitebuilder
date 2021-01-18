import {
  AfterViewChecked,
  Directive,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appInputFormErrorGrouper]'
})
export class InputFormErrorGrouperDirective implements AfterViewChecked{

  @Input('appInputFormErrorGrouper') groupeName: string;
  hasError = false;

  constructor() {

  }

  ngAfterViewChecked(): void {
    this.hasError = false;
  }
}
