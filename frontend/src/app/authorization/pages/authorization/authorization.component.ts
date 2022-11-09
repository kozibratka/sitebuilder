import { Component, OnInit } from '@angular/core';
import {Event} from '../../../core/services/api/symfony-api/tools/constants/event';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND_POST, stopSendLogin: Event.POST_SEND_POST};

  constructor() { }

  ngOnInit(): void {
  }

}
