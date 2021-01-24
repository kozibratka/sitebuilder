import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  Host,
  OnInit,
  Optional,
  Self,
  ViewContainerRef
} from '@angular/core';
import {FormGroupDirective, ValidationErrors} from '@angular/forms';
import {InputFormErrorGrouperDirective} from '../../directives/form-error/input-form-error-grouper.directive';

@Component({
  selector: 'app-global-form-error',
  templateUrl: './global-form-error.component.html',
  styleUrls: ['./global-form-error.component.css']
})
export class GlobalFormErrorComponent implements AfterContentInit{

  errors: ValidationErrors = {};
  objectKeys = Object.keys;

  constructor(
    @Host() @Optional() private parentFormControl: FormGroupDirective,
    @Host() @Optional() private inputFormErrorGrouperDirective: InputFormErrorGrouperDirective,
  ) { }

  ngAfterContentInit(): void {
    if (!this.parentFormControl) {
      return;
    }
    this.parentFormControl.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.errors = this.parentFormControl.errors ?? {};
        if (this.inputFormErrorGrouperDirective) {
          this.inputFormErrorGrouperDirective.hasError = true;
        }
      }
    });
  }
}
