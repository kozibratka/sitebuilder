import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FontAwesomeIcons} from "../core/constants/FontAwesomeIcons";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";

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

  constructor(library: FaIconLibrary) {
    library.addIcons(...FontAwesomeIcons);
  }

  ngOnInit(): void {
  }

}
