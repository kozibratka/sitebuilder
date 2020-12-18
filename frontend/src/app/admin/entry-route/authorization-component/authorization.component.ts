import { Component, OnInit } from '@angular/core';
import {Event} from '../../../core/services/symfony-api/tools/constants/event';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  symfonyApiCallEvent = {startSendLogin: Event.PRE_SEND, stopSendLogin: Event.POST_SEND};

  constructor() { }

  ngOnInit(): void {
  }

}
