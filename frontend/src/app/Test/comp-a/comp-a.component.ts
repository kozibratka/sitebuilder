import { Component } from '@angular/core';
import {CompBComponent} from "../comp-b/comp-b.component";
import {SerAService} from "../services/ser-a.service";
import {SerBService} from "../services/ser-b.service";
import {SortablejsModule} from "nxt-sortablejs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-comp-a',
  standalone: true,
  imports: [
    CompBComponent,
    SortablejsModule,
    NgForOf
  ],
  templateUrl: './comp-a.component.html',
  styleUrl: './comp-a.component.css',
  providers: []
})
export class CompAComponent {
  arrayA = ['A'];
  arrayB = ['B'];


  constructor() {
  }
}
