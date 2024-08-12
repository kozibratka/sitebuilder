import {
  AfterContentInit,
  ComponentFactoryResolver, ContentChild,
  Directive, ElementRef, Host, OnDestroy, Optional, Renderer2, Self,
  ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {ErrorMessageComponent} from './tools/components/error-message/error-message.component';
import {InputFormErrorGrouperDirective} from '../input-form-error-grouper.directive';

@Directive({
  selector: '[appFormError]',
  standalone: true,
})
export class InputFormErrorDirective implements AfterContentInit, OnDestroy{

  @ContentChild(NgControl, {read: NgControl}) formInput: NgControl;
  @ContentChild(NgControl, {read: ElementRef}) formInputElementRef: ElementRef;
  @ContentChild('errorFormContainer', {read: ViewContainerRef}) errorFormContainer: ViewContainerRef;
  private errorMessageComonent: ErrorMessageComponent;

  constructor(
    private resolve: ComponentFactoryResolver,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private selfViewContainer: ViewContainerRef,
    @Host() @Optional() private inputFormErrorGrouperDirective: InputFormErrorGrouperDirective,
    @Optional() @Self() private selfInput?: NgControl,
  ) {
  }

  ngAfterContentInit(): void {
    if (this.selfInput) {
      this.errorFormContainer = this.selfViewContainer;
      this.formInputElementRef = this.elementRef;
    } else {
      if (!this.errorFormContainer) {
        this.errorFormContainer = this.selfViewContainer;
      }
      this.selfInput = this.formInput;
    }
    this.selfInput.statusChanges?.subscribe(status => {
      this.clearMessage();
      if (status === 'INVALID') {
        this.createErrorMessage();
        if (this.inputFormErrorGrouperDirective?.hasError) {
          this.inputFormErrorGrouperDirective.hasError = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
  }

  createErrorMessage(): void {
    const factory = this.resolve.resolveComponentFactory(ErrorMessageComponent);
    this.errorMessageComonent = this.errorFormContainer.createComponent<ErrorMessageComponent>(factory).instance;
    if (this.selfInput?.errors) {
      this.errorMessageComonent.errors = this.selfInput.errors;
    }
  }

  clearMessage(): void {
    this.errorFormContainer.clear();
  }

}
