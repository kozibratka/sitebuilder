import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {CompBComponent} from "../comp-b/comp-b.component";
import {SortablejsModule} from "nxt-sortablejs";
import {NgForOf} from "@angular/common";
import {DirectiveADirective} from "../directives/directive-a.directive";

@Component({
  selector: 'app-comp-a',
  standalone: true,
  imports: [
    CompBComponent,
    SortablejsModule,
    NgForOf,
    DirectiveADirective
  ],
  templateUrl: './comp-a.component.html',
  styleUrl: './comp-a.component.css',
  providers: []
})
export class CompAComponent implements OnInit, AfterContentChecked, AfterViewChecked{
  arrayA = ['A'];
  arrayB = ['B'];
  kokos: string = 'wwwwwwwwwwwww';


  constructor() {
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked A')
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked A')
  }

  ngOnInit(): void {
    console.log('ngOnInit A')
    setTimeout(() => this.kokos='wwwwwwwwwwwww', 3000);
  }


}
