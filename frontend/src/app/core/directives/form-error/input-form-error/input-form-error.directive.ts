import {
  AfterContentChecked,
  AfterContentInit, ChangeDetectorRef,
  ComponentFactoryResolver, ContentChild,
  Directive, ElementRef, Host, OnDestroy, Optional, Renderer2, Self,
  ViewContainerRef
} from '@angular/core';
import {FormControlName, NgControl} from '@angular/forms';
import {ErrorMessageComponent} from './tools/components/error-message/error-message.component';
import {InputFormErrorGrouperDirective} from '../input-form-error-grouper.directive';

@Directive({
  selector: '[appFormError]',
  standalone: true,
})
export class InputFormErrorDirective implements AfterContentInit, OnDestroy, AfterContentChecked{

  @ContentChild(FormControlName, {read: FormControlName}) formInput: FormControlName;
  @ContentChild(NgControl, {read: ElementRef}) formInputElementRef: ElementRef;
  @ContentChild('errorFormContainer', {read: ViewContainerRef}) errorFormContainer: ViewContainerRef;
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
    // this.selfInput.statusChanges?.subscribe(status => {
    //   this.clearMessage();
    //   if (status === 'INVALID') {
    //     this.createErrorMessage();
    //     if (this.inputFormErrorGrouperDirective?.hasError) {
    //       this.inputFormErrorGrouperDirective.hasError = true;
    //     }
    //   }
    // });
  }

  ngAfterContentChecked(): void {
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


  ngOnDestroy(): void {
  }

  createErrorMessage(): void {
    this.errorMessageComonent = this.errorFormContainer.createComponent(ErrorMessageComponent).instance;
    this.errorMessageComonent.errors = this.selfInput.errors;
    this.errorMessageComonent.control = this.selfInput;
    this.cdRef.detectChanges();
  }

  clearMessage(): void {
    this.errorFormContainer.clear();
    this.cdRef.detectChanges();
  }

}
