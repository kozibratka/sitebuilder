import { Component, OnInit } from '@angular/core';
import {Event} from '../../../core/services/api/symfony-api/tools/constants/event';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatProgressBar} from "@angular/material/progress-bar";
import {HiderElementDirective} from "../../../core/directives/hider-element.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-authorization',
  standalone: true,
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBar,
    HiderElementDirective,
    FormsModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule
  ]
})
export class AuthorizationComponent implements OnInit {

  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND_POST, stopSendLogin: Event.POST_SEND_POST};

  constructor(
  ) { }

  ngOnInit(): void {
    //this.loginLayoutService.initLayout()
  }

}
