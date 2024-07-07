import { Component } from '@angular/core';
import {SerAService} from "../services/ser-a.service";
import {SerBService} from "../services/ser-b.service";

@Component({
  selector: 'app-comp-b',
  standalone: true,
  imports: [],
  templateUrl: './comp-b.component.html',
  styleUrl: './comp-b.component.css',
  providers: [SerAService, SerBService]
})
export class CompBComponent {

  constructor(
    s: SerAService
  ) {
    s.lol();
  }
}
