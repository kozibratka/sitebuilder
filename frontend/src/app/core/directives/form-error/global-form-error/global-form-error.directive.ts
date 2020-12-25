import {AfterContentInit, ComponentFactoryResolver, ContentChild, Directive, Host, Optional, Self, ViewContainerRef} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective} from '@angular/forms';
import {GlobalFormErrorMessageComponent} from './tools/components/global-form-error-message/global-form-error-message.component';

@Directive({
  selector: '[appGlobalFormError]'
})
export class GlobalFormErrorDirective implements AfterContentInit{

  @ContentChild('globalFormErrors', {read: ViewContainerRef}) globalFormErrorsContainer: ViewContainerRef;

  constructor(
    @Self() private selfFormControl: FormGroupDirective,
    private resolve: ComponentFactoryResolver,
  ) { }

  ngAfterContentInit(): void {
    this.selfFormControl.statusChanges.subscribe(status => {
      this.globalFormErrorsContainer.clear();
      if (status === 'INVALID') {
        this.createErrorMessage();
      }
    });
  }

  createErrorMessage(): void {
    const factory = this.resolve.resolveComponentFactory(GlobalFormErrorMessageComponent);
    const errorMessageComonent = this.globalFormErrorsContainer.createComponent<GlobalFormErrorMessageComponent>(factory).instance;
    errorMessageComonent.errors = this.selfFormControl.errors ?? {};
  }

}
