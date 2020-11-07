import { Component, OnInit } from '@angular/core';
import {LoginClientService} from '../../../core/services/login-client/login-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sf: LoginClientService) {
    sf.tryLogin('email@email.cz', 'heslo').subscribe(test => {}, error => {});
  }

  ngOnInit(): void {
  }

}
