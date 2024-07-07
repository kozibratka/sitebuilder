import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-public',
  standalone: true,
  templateUrl: './app-public.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app-public.component.css']
})
export class AppPublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
