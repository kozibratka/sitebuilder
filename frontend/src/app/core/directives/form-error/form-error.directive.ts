import {
  AfterContentInit,
  ComponentFactoryResolver, ContentChild,
  Directive, Optional, Self,
  ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {ErrorMessageComponent} from './tools/components/error-message/error-message.component';

@Directive({
  selector: '[appFormError]'
})
export class FormErrorDirective implements AfterContentInit{

  @ContentChild(NgControl, {read: NgControl}) formInput: NgControl;
  @ContentChild('errorFormContainer', {read: ViewContainerRef}) errorFormContainer: ViewContainerRef;
  private errorMessageComonent: ErrorMessageComponent;

  constructor(
    private resolve: ComponentFactoryResolver,
    @Optional() @Self() private selfInput?: NgControl,
    private selfViewContainer?: ViewContainerRef
  ) {
  }

  ngAfterContentInit(): void {
    let container: ViewContainerRef;
    if (this.selfInput || !this.errorFormContainer) {
      container = this.selfViewContainer;
    }
    else {
      container = this.errorFormContainer;
    }
    this.formInput.statusChanges.subscribe(status => {
      console.log(status);
      this.clearMessage(container);
      if (status === 'INVALID') {
        this.createErrorMessage(container);
      }
    });
  }

  createErrorMessage(container: ViewContainerRef): void {
    const factory = this.resolve.resolveComponentFactory(ErrorMessageComponent);
    this.errorMessageComonent = container.createComponent<ErrorMessageComponent>(factory).instance;
    this.errorMessageComonent.errors = this.formInput.errors;
  }

  clearMessage(container: ViewContainerRef): void {
    container.clear();
  }

}
