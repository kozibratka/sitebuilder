import {
  AfterContentChecked,
  AfterContentInit, ChangeDetectorRef,
  ComponentFactoryResolver, ContentChild,
  Directive, DoCheck, ElementRef, Host, Input, OnDestroy, OnInit, Optional, Renderer2, Self,
  ViewContainerRef
} from '@angular/core';
import {Form, FormControlName, NgControl, ValidationErrors} from '@angular/forms';
import {ErrorMessageComponent} from './tools/components/error-message/error-message.component';
import {InputFormErrorGrouperDirective} from '../input-form-error-grouper.directive';

@Directive({
  selector: '[appFormError]',
  standalone: true,
})
export class InputFormErrorDirective implements OnInit, DoCheck{

  @ContentChild(FormControlName, {read: FormControlName, static: true}) formInput: FormControlName;
  @ContentChild(NgControl, {read: ElementRef, static: true}) formInputElementRef: ElementRef;
  @ContentChild('errorFormContainer', {read: ViewContainerRef, static: true}) errorFormContainer: ViewContainerRef;
  private errorMessageComonent: ErrorMessageComponent;
  private isError = false;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private selfViewContainer: ViewContainerRef,
    private cdRef: ChangeDetectorRef,
    @Host() @Optional() private inputFormErrorGrouperDirective: InputFormErrorGrouperDirective,
    @Optional() @Self() private selfInput?: FormControlName,
  ) {
  }

  ngOnInit(): void {
    if (this.selfInput) {
      this.errorFormContainer = this.selfViewContainer;
      this.formInputElementRef = this.elementRef;
    } else {
      if (!this.errorFormContainer) {
        this.errorFormContainer = this.selfViewContainer;
      }
      this.selfInput = this.formInput;
    }
  }

  ngDoCheck(): void {
    if (this.selfInput.touched || this.selfInput.dirty) {
      if (!this.isError && this.selfInput?.errors) {
        this.isError = true;
        this.createErrorMessage();
      } else if(this.isError && !this.selfInput?.errors) {
        this.isError = false;
        this.clearMessage();
      }
    }
  }
  createErrorMessage(): void {
    this.errorMessageComonent = this.errorFormContainer.createComponent(ErrorMessageComponent).instance;
    this.errorMessageComonent.errors = this.selfInput.errors;
    this.errorMessageComonent.control = this.selfInput;
  }

  clearMessage(): void {
    this.errorFormContainer.clear();
  }
}
