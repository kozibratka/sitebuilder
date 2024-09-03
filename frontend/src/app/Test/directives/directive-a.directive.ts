import {
  AfterContentChecked,
  ChangeDetectorRef,
  ContentChild,
  Directive, Input, OnInit,
  Optional,
  Self,
  ViewContainerRef
} from '@angular/core';
import {CompBComponent} from "../comp-b/comp-b.component";
import {CompCComponent} from "../comp-c/comp-c.component";
import {FormControlName} from "@angular/forms";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Directive({
  selector: '[appDirectiveA]',
  standalone: true
})
export class DirectiveADirective implements AfterContentChecked, OnInit{
  private _value = '';
  isInit = false;

  constructor(
    private selfViewContainer: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Self() private compB?: CompBComponent,
  ) { }
  get value(): string {
    return this._value;
  }
  @Input()
  set value(value: string) {
    this._value = value;
    if (!this.isInit) {
      let compC = this.selfViewContainer.createComponent(CompCComponent).instance;
      compC.data = 'lllllllll';
      //this.changeDetectorRef.detectChanges();
      this.isInit = true;
    }
    console.log('input  Adirective')
  }

  // @ContentChild(CompBComponent, {read: CompBComponent}) compB: CompBComponent;

  ngOnInit(): void {
    console.log('ngOnInit Adirective')
  }


  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked Adirective')

  }


  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked Adirective')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit Adirective')
  }

}
