import {
  AfterViewInit,
  ContentChildren,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import {FormControlName, NgControl} from '@angular/forms';

@Directive({
  selector: '[appInputFormErrorGrouper]'
})
export class InputFormErrorGrouperDirective implements AfterViewInit{

  @Input('appInputFormErrorGrouper') groupeName: string;
  @ContentChildren(NgControl, {descendants: true}) formInputs: QueryList<NgControl>;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.formInputs);
  }
}
