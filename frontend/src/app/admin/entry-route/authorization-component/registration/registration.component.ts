import { Component, OnInit } from '@angular/core';
import {LoginClientService} from '../../../../core/services/login-client/login-client.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private loginClientService: LoginClientService) { }

  ngOnInit(): void {
  }

}
